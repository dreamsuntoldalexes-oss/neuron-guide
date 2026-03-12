import { motion } from "framer-motion";
import { CreditCard, ShoppingCart, Zap, Mail, Phone, MessageCircle, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: ["Browse all AI tools", "Save up to 5 favorites", "Basic chatbot access"],
    gradient: "from-muted to-muted/50",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    features: ["Unlimited favorites", "Advanced AI chatbot", "Priority tool updates", "Exclusive tutorials"],
    gradient: "from-primary/20 to-neon-purple/20",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$29.99/mo",
    features: ["Everything in Pro", "API access", "Custom recommendations", "Dedicated support", "Team features"],
    gradient: "from-neon-purple/20 to-neon-pink/20",
    popular: false,
  },
];

const contactMethods = [
  {
    icon: Mail,
    label: "Email to Pay",
    subtitle: "adekanmbiadekanmbi5@gmail.com",
    href: "mailto:adekanmbiadekanmbi5@gmail.com?subject=Payment%20/%20Upgrade%20Request&body=Hi%2C%20I%20would%20like%20to%20upgrade%20my%20plan.%20Please%20send%20me%20payment%20details.",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp to Pay",
    subtitle: "08033962964",
    href: "https://wa.me/2348033962964?text=Hi%2C%20I%20would%20like%20to%20upgrade%20my%20plan.%20Please%20send%20me%20payment%20details.",
  },
  {
    icon: Phone,
    label: "Call to Pay",
    subtitle: "09029837829",
    href: "tel:09029837829",
  },
];

export default function Pricing() {
  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 space-y-8 max-w-md mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-primary" /> Upgrade & Pay
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Choose a plan and contact us to complete payment</p>
        </motion.div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-5 relative overflow-hidden ${plan.popular ? "border-primary/40" : ""}`}
            >
              {plan.popular && (
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider gradient-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              <div className="flex items-baseline gap-2 mb-3">
                <h3 className="text-lg font-heading font-bold text-foreground">{plan.name}</h3>
                <span className="text-primary font-semibold">{plan.price}</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:adekanmbiadekanmbi5@gmail.com?subject=Upgrade%20to%20${plan.name}%20Plan&body=Hi%2C%20I%20want%20to%20upgrade%20to%20the%20${plan.name}%20plan%20(${plan.price}).%20Please%20send%20me%20payment%20details.`}
                className="w-full py-2.5 rounded-xl font-heading font-semibold text-sm text-primary-foreground gradient-primary flex items-center justify-center gap-2 hover:opacity-90 transition active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" />
                {plan.price === "Free" ? "Current Plan" : "Get This Plan"}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Contact to Pay */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" /> How to Pay
          </h2>
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
