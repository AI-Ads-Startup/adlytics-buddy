import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  MapPin,
  Target,
  Users,
  CreditCard,
  Sparkles,
  Building2,
  Utensils,
  Gavel,
  Stethoscope,
  Car,
  Home
} from "lucide-react";

interface SignupForm {
  businessName: string;
  ownerName: string;
  email: string;
  industry: string;
  phone: string;
  promoCode?: string;
  address: string;
  targetRadius: number;
  businessGoals: string[];
  targetAge: [number, number];
  targetAudience: string[];
}

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupForm>({
    businessName: "",
    ownerName: "",
    email: "",
    industry: "",
    phone: "",
    promoCode: "",
    address: "",
    targetRadius: 10,
    businessGoals: [],
    targetAge: [25, 55],
    targetAudience: []
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const industries = [
    { value: "restaurant", label: "Restaurant", icon: <Utensils className="h-4 w-4" /> },
    { value: "legal", label: "Legal Services", icon: <Gavel className="h-4 w-4" /> },
    { value: "healthcare", label: "Healthcare", icon: <Stethoscope className="h-4 w-4" /> },
    { value: "automotive", label: "Automotive", icon: <Car className="h-4 w-4" /> },
    { value: "realestate", label: "Real Estate", icon: <Home className="h-4 w-4" /> },
    { value: "general", label: "General Business", icon: <Building2 className="h-4 w-4" /> }
  ];

  const businessGoals = [
    "Increase phone calls",
    "Drive website traffic", 
    "Get more appointments",
    "Boost online sales",
    "Increase foot traffic",
    "Build brand awareness"
  ];

  const audiences = [
    "Local customers",
    "Business professionals", 
    "Families with children",
    "Young adults",
    "Seniors",
    "High-income households"
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof SignupForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: string) => {
    const goals = formData.businessGoals.includes(goal)
      ? formData.businessGoals.filter(g => g !== goal)
      : [...formData.businessGoals, goal];
    updateFormData('businessGoals', goals);
  };

  const toggleAudience = (audience: string) => {
    const audiences = formData.targetAudience.includes(audience)
      ? formData.targetAudience.filter(a => a !== audience)
      : [...formData.targetAudience, audience];
    updateFormData('targetAudience', audiences);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Get Started with AdsCampaign</h1>
            <p className="text-muted-foreground">Step {currentStep} of {totalSteps}</p>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  <span>Tell us about your business</span>
                </CardTitle>
                <CardDescription>
                  This helps us create better campaigns for your specific industry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input 
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => updateFormData('businessName', e.target.value)}
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Your Name</Label>
                    <Input 
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => updateFormData('ownerName', e.target.value)}
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="john@business.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          <div className="flex items-center space-x-2">
                            {industry.icon}
                            <span>{industry.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promoCode">Promo Code (Optional)</Label>
                  <Input 
                    id="promoCode"
                    value={formData.promoCode}
                    onChange={(e) => updateFormData('promoCode', e.target.value)}
                    placeholder="Enter promo code"
                  />
                </div>

                <Button onClick={handleNext} className="w-full" size="lg" disabled={!formData.businessName || !formData.email}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Platform Subscription */}
          {currentStep === 2 && (
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <span>Platform Subscription</span>
                </CardTitle>
                <CardDescription>
                  Secure your platform access - no advertising budget required
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-card rounded-lg p-6 border">
                  <div className="text-center space-y-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Platform Access
                    </Badge>
                    <div className="text-4xl font-bold">$150<span className="text-xl text-muted-foreground">/month</span></div>
                    <p className="text-muted-foreground">Everything you need to create and manage campaigns</p>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    {[
                      "AI-powered campaign builder",
                      "Keyword research & optimization", 
                      "Performance tracking & reports",
                      "Mobile campaign management",
                      "Expert support when needed",
                      "No long-term contracts"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">No Advertising Budget Required</p>
                      <p className="text-sm text-muted-foreground">
                        Start building campaigns immediately. Set your advertising budget when you're ready to launch.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Card Number</Label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input placeholder="123" />
                    </div>
                    <div className="space-y-2">
                      <Label>ZIP Code</Label>
                      <Input placeholder="12345" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={handlePrev} className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext} className="w-full" variant="cta">
                    Subscribe & Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Business Profile */}
          {currentStep === 3 && (
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Target className="h-6 w-6 text-primary" />
                  <span>Business Profile</span>
                </CardTitle>
                <CardDescription>
                  Help us understand your customers and goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input 
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="123 Main St, City, State"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Target Radius: {formData.targetRadius} miles</Label>
                  <Slider
                    value={[formData.targetRadius]}
                    onValueChange={(value) => updateFormData('targetRadius', value[0])}
                    max={50}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>5 miles</span>
                    <span>50 miles</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Business Goals (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {businessGoals.map((goal) => (
                      <div 
                        key={goal}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.businessGoals.includes(goal) 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => toggleGoal(goal)}
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            checked={formData.businessGoals.includes(goal)}
                          />
                          <span className="text-sm font-medium">{goal}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Target Age Range: {formData.targetAge[0]} - {formData.targetAge[1]} years</Label>
                  <Slider
                    value={formData.targetAge}
                    onValueChange={(value) => updateFormData('targetAge', value as [number, number])}
                    max={70}
                    min={18}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>18 years</span>
                    <span>70+ years</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Target Audience (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {audiences.map((audience) => (
                      <div 
                        key={audience}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.targetAudience.includes(audience) 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => toggleAudience(audience)}
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            checked={formData.targetAudience.includes(audience)}
                          />
                          <span className="text-sm font-medium">{audience}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={handlePrev} className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext} className="w-full" variant="cta">
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Welcome & Next Steps */}
          {currentStep === 4 && (
            <Card className="shadow-elegant">
              <CardHeader className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Welcome to AdsCampaign! 🎉</CardTitle>
                <CardDescription className="text-lg">
                  Your account is ready. Here's what you can do next:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      icon: <Target className="h-5 w-5" />,
                      title: "Build Your First Campaign",
                      description: "Use our AI-powered builder to create professional Google Ads in 15 minutes"
                    },
                    {
                      icon: <MapPin className="h-5 w-5" />,
                      title: "Explore the Dashboard",
                      description: "Familiarize yourself with campaign management and performance tracking"
                    },
                    {
                      icon: <Users className="h-5 w-5" />,
                      title: "Set Budget When Ready",
                      description: "No rush - configure your advertising budget when you're ready to launch"
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">No Pressure!</p>
                      <p className="text-sm text-muted-foreground">
                        Feel free to explore and build campaigns. You can launch them whenever you're ready.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" className="w-full" size="lg">
                    Take a Tour
                  </Button>
                  <Button variant="cta" className="w-full" size="lg">
                    Start Building
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;