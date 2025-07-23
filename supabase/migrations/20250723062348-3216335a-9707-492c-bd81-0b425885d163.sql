-- Create user profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  target_radius INTEGER DEFAULT 25,
  business_goals TEXT[],
  target_age_min INTEGER DEFAULT 18,
  target_age_max INTEGER DEFAULT 65,
  target_audience TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  amount INTEGER NOT NULL DEFAULT 15000, -- $150.00 in cents
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused')),
  budget_amount INTEGER, -- Monthly budget in cents
  start_date DATE,
  website_url TEXT,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create keywords table
CREATE TABLE public.keywords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  match_type TEXT NOT NULL DEFAULT 'broad' CHECK (match_type IN ('exact', 'phrase', 'broad')),
  bid_amount INTEGER, -- Bid in cents
  competition TEXT CHECK (competition IN ('high', 'medium', 'low')),
  search_volume INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ads table
CREATE TABLE public.ads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  headlines TEXT[] NOT NULL,
  descriptions TEXT[] NOT NULL,
  final_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create targeting_settings table
CREATE TABLE public.targeting_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  locations TEXT[],
  radius INTEGER DEFAULT 25,
  age_min INTEGER DEFAULT 18,
  age_max INTEGER DEFAULT 65,
  genders TEXT[],
  schedule JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create performance_metrics table
CREATE TABLE public.performance_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  calls INTEGER DEFAULT 0,
  cost INTEGER DEFAULT 0, -- Cost in cents
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.targeting_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for subscriptions
CREATE POLICY "Users can view their own subscription" 
ON public.subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" 
ON public.subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for campaigns
CREATE POLICY "Users can view their own campaigns" 
ON public.campaigns 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own campaigns" 
ON public.campaigns 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" 
ON public.campaigns 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" 
ON public.campaigns 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for keywords (based on campaign ownership)
CREATE POLICY "Users can view keywords for their campaigns" 
ON public.keywords 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = keywords.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can create keywords for their campaigns" 
ON public.keywords 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = keywords.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can update keywords for their campaigns" 
ON public.keywords 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = keywords.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can delete keywords for their campaigns" 
ON public.keywords 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = keywords.campaign_id 
  AND campaigns.user_id = auth.uid()
));

-- Create RLS policies for ads (based on campaign ownership)
CREATE POLICY "Users can view ads for their campaigns" 
ON public.ads 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = ads.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can create ads for their campaigns" 
ON public.ads 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = ads.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can update ads for their campaigns" 
ON public.ads 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = ads.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can delete ads for their campaigns" 
ON public.ads 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = ads.campaign_id 
  AND campaigns.user_id = auth.uid()
));

-- Create RLS policies for targeting_settings (based on campaign ownership)
CREATE POLICY "Users can view targeting for their campaigns" 
ON public.targeting_settings 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = targeting_settings.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can create targeting for their campaigns" 
ON public.targeting_settings 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = targeting_settings.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can update targeting for their campaigns" 
ON public.targeting_settings 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = targeting_settings.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can delete targeting for their campaigns" 
ON public.targeting_settings 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = targeting_settings.campaign_id 
  AND campaigns.user_id = auth.uid()
));

-- Create RLS policies for performance_metrics (based on campaign ownership)
CREATE POLICY "Users can view metrics for their campaigns" 
ON public.performance_metrics 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.campaigns 
  WHERE campaigns.id = performance_metrics.campaign_id 
  AND campaigns.user_id = auth.uid()
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_keywords_updated_at
  BEFORE UPDATE ON public.keywords
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ads_updated_at
  BEFORE UPDATE ON public.ads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_targeting_settings_updated_at
  BEFORE UPDATE ON public.targeting_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, business_name, owner_name, industry)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'business_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'owner_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'industry', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();