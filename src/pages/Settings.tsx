import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Image as ImageIcon, Sparkles, Mail, Moon, Volume2, Shield, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import aiBg from "@/assets/ai-fusion-bg.jpg";
import AdminNotificationSender from "@/components/AdminNotificationSender";


type SettingsState = {
  notifyNewImages: boolean;
  notifyNewTools: boolean;
  notifyEmail: boolean;
  notifySound: boolean;
  darkMode: boolean;
  reduceMotion: boolean;
};

const DEFAULTS: SettingsState = {
  notifyNewImages: true,
  notifyNewTools: true,
  notifyEmail: false,
  notifySound: true,
  darkMode: true,
  reduceMotion: false,
};

const STORAGE_KEY = "neuron-view-settings";

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState>(DEFAULTS);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
    if (typeof Notification !== "undefined") setPermission(Notification.permission);
  }, []);

  const update = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const requestPermission = async () => {
    if (typeof Notification === "undefined") {
      toast({ title: "Not supported", description: "Notifications aren't supported on this device." });
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      toast({ title: "Notifications enabled", description: "You'll be alerted when new AI images are added." });
      new Notification("Neuron Guide", { body: "🔔 You're all set! We'll notify you about new AI images & tools." });
    } else {
      toast({ title: "Permission denied", description: "Enable notifications in your browser settings." });
    }
  };

  const handleToggleImages = (val: boolean) => {
    update("notifyNewImages", val);
    if (val && permission !== "granted") requestPermission();
  };

  const sections: {
    title: string;
    items: {
      key: keyof SettingsState;
      icon: typeof Bell;
      label: string;
      desc: string;
      onChange?: (v: boolean) => void;
    }[];
  }[] = [
    {
      title: "Notifications",
      items: [
        { key: "notifyNewImages", icon: ImageIcon, label: "New AI Images", desc: "Get notified when new AI-generated images are added to the directory.", onChange: handleToggleImages },
        { key: "notifyNewTools", icon: Sparkles, label: "New AI Tools", desc: "Be the first to know when fresh AI tools launch." },
        { key: "notifyEmail", icon: Mail, label: "Email Updates", desc: "Receive a weekly digest in your inbox." },
        { key: "notifySound", icon: Volume2, label: "Sound Alerts", desc: "Play a soft chime for in-app notifications." },
      ],
    },
    {
      title: "Appearance",
      items: [
        { key: "darkMode", icon: Moon, label: "Dark Mode", desc: "Neuron Guide shines best in the dark." },
        { key: "reduceMotion", icon: Shield, label: "Reduce Motion", desc: "Tone down animations & background effects." },
      ],
    },
  ];

  return (
    <Layout>
      {/* AI fusion hero header */}
      <div className="relative h-44 sm:h-56 overflow-hidden">
        <img
          src={aiBg}
          alt="AI human computer fusion background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-heading font-bold gradient-text"
          >
            Settings
          </motion.h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 tracking-widest uppercase">
            Personalize your experience
          </p>
        </div>
      </div>

      <div className="px-4 pb-6 -mt-6 max-w-md mx-auto space-y-6 relative z-10">
        {/* Permission banner */}
        {permission !== "granted" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 flex items-start gap-3 border-primary/30"
          >
            <div className="p-2 rounded-xl bg-primary/15">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">Enable push alerts</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Allow notifications so we can ping you the moment new AI images drop.
              </p>
              <button
                onClick={requestPermission}
                className="mt-3 text-xs font-medium px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground active:scale-95 transition"
              >
                Allow notifications
              </button>
            </div>
          </motion.div>
        )}

        {sections.map((section, sIdx) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIdx * 0.08 }}
            className="space-y-3"
          >
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1">
              {section.title}
            </h2>
            <div className="glass-card divide-y divide-border/40 overflow-hidden">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-start gap-3 p-4">
                    <div className="p-2 rounded-lg bg-muted/60">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <Switch
                      checked={settings[item.key]}
                      onCheckedChange={(v) => (item.onChange ? item.onChange(v) : update(item.key, v))}
                    />
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))}

        <AdminNotificationSender />

        <motion.section

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 flex items-center gap-3"
        >
          <Globe className="w-5 h-5 text-accent" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Version</p>
            <p className="text-xs text-muted-foreground">Neuron Guide v1.0.0 · Built with ⚡</p>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
