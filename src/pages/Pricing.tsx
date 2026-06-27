import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { CreditCard, Zap, Mail, Phone, MessageCircle, Crown, Check, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { setUserTier, getUserTier, type UserTier } from "@/data/tools";
import { useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactMethods = [
  {
    icon: Mail,
    label: "Email Support",
    subtitle: "adekanmbiadekanmbi5@gmail.com",
    href: "mailto:adekanmbiadekanmbi5@gmail.com?subject=NEURON%20VIEW%20Pro%20%245%2Fmonth&body=Hi%2C%20I%20want%20to%20subscribe%20to%20Pro%20at%20%245%2Fmonth.",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Support",
    subtitle: "08033962964",
    href: "https://wa.me/2348033962964?text=Hi%2C%20I%20want%20to%20subscribe%20to%20NEURON%20VIEW%20Pro%20at%20%245%2Fmonth.",
  },
  {
    icon: Phone,
    label: "Call Support",
    subtitle: "08033962964",
    href: "tel:08033962964",
  },
];

export default function Pricing() {
  const [currentTier, setCurrentTier] = useState<UserTier>(getUserTier());
  const [proPrice, setProPrice] = useState(5);
  const [proFeatures, setProFeatures] = useState<string[]>([
    "Unlimited access to 11,000+ AI tools",
    "Unlimited favorites",
    "Advanced AI assistant",
    "Per-tool usage analytics",
    "Priority tool updates",
    "Exclusive tutorials",
  ]);

  useEffect(() => {
    supabase
      .from("pricing_plans")
      .select("price_usd, features")
      .eq("id", "pro_monthly")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.price_usd) setProPrice(Number(data.price_usd));
        if (data?.features?.length) setProFeatures(data.features);
      });
  }, []);

  const plans = useMemo(() => [
    {
      name: "Free",
      tier: "free" as UserTier,
      price: "$0",
      period: "forever",
      features: ["Browse free AI tools", "Save up to 5 favorites", "Basic AI assistant", "Standard tool info"],
      popular: false,
    },
    {
      name: "Pro",
      tier: "pro" as UserTier,
      price: `$${proPrice}`,
      period: "per month",
      features: proFeatures,
      popular: true,
    },
  ], [proFeatures, proPrice]);

  const handleSelectPlan = (tier: UserTier) => {
    if (tier === "free") {
      setUserTier("free");
      setCurrentTier("free");
      toast({ title: "Switched to Free plan" });
      return;
    }
    toast({
      title: "Stripe checkout coming soon",
      description: `The backend plan is ready at $${proPrice}/month. Stripe checkout will be enabled when keys are added.`,
    });
  };

  return (
    <Layout>
      <Seo title="Pricing — NEURON VIEW Pro $5/month" description="Unlock unlimited access to 500+ AI tools, exam mode, and pro features for $5/month." path="/pricing" />
      <div className="px-4 pt-6 pb-4 space-y-8 max-w-md mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-primary" /> Upgrade
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Simple $5/month pricing. Stripe checkout will be connected later.</p>
          <p className="text-xs text-primary mt-2 flex items-center justify-center gap-1">
            <Crown className="w-3 h-3" /> Current plan: <span className="font-bold capitalize">{currentTier}</span>
          </p>
        </motion.div>

        <div className="space-y-4">
          {plans.map((plan, i) => {
            const isCurrent = plan.tier === currentTier;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-5 relative overflow-hidden ${plan.popular ? "border-primary/40" : ""} ${isCurrent ? "ring-1 ring-primary/50" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider gradient-primary text-primary-foreground px-2 py-0.5 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <div className="flex items-baseline gap-2 mb-3">
                  <h3 className="text-lg font-heading font-bold text-foreground">{plan.name}</h3>
                  <span className="text-2xl font-heading font-bold text-primary">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelectPlan(plan.tier)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-xl font-heading font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-[0.98] ${
                    isCurrent ? "bg-muted text-muted-foreground cursor-not-allowed" : "text-primary-foreground gradient-primary hover:opacity-90"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {isCurrent ? "Current Plan" : plan.tier === "free" ? "Switch to Free" : `Subscribe — $${proPrice}/month`}
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" /> Backend Pricing
          </h2>
          <p className="text-xs text-muted-foreground mb-3">
            The Pro subscription plan is stored in Supabase at ${proPrice}/month. Use contact support until Stripe keys are added.
          </p>
          <div className="space-y-2">
            {contactMethods.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition block"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.subtitle}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
