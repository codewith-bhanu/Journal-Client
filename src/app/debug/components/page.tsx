"use client";

import React, { useState } from "react";
import {
  Check,
  Flame,
  Mic,
  Plus,
  Search,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Field from "@/components/ui/Field";
import TextArea from "@/components/ui/TextArea";
import Chip from "@/components/ui/Chip";
import Toggle from "@/components/ui/Toggle";
import Avatar from "@/components/ui/Avatar";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { ConfirmDialog, Modal } from "@/components/ui/Modal";
import Skeleton from "@/components/ui/Skeleton";
import Spinner from "@/components/ui/Spinner";
import Stat from "@/components/ui/Stat";
import BarChart from "@/components/ui/BarChart";
import WaveformIcon from "@/components/ui/WaveformIcon";

const BUTTON_VARIANTS = ["primary", "soft", "ghost", "surface", "danger"] as const;
const BUTTON_SIZES = [
  ["sm", "Small"],
  ["md", "Medium"],
  ["lg", "Large"],
] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 border-b border-line pb-2 font-serif text-2xl text-ink">
        {title}
      </h2>
      <div className="rounded-lg border border-line bg-paper p-6">{children}</div>
    </section>
  );
}

function ButtonsDemo() {
  return (
    <div className="space-y-6">
      {BUTTON_SIZES.map(([size, label]) => (
        <div key={size} className="flex flex-wrap items-center gap-3">
          <span className="w-20 flex-shrink-0 text-xs font-medium text-ink3">
            {label}
          </span>
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} size={size} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
        <Button variant="primary" icon={<Plus size={16} />}>
          New entry
        </Button>
        <Button variant="soft" icon={<Mic size={16} />}>
          Record
        </Button>
        <Button variant="ghost" shortcut="s">
          Save
        </Button>
        <Button variant="primary" shortcut="Enter">
          Search
        </Button>
        <Button variant="surface" loading>
          Loading
        </Button>
        <Button variant="surface" disabled>
          Disabled
        </Button>
      </div>

      <div className="max-w-xs border-t border-line pt-6">
        <Button variant="primary" block icon={<Check size={16} />}>
          Full width
        </Button>
      </div>
    </div>
  );
}

function CardsDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>Elevated — surface background with shadow. Good for content tiles.</Card>
      <Card variant="flat">Flat — surface background, hairline border, no shadow.</Card>
      <Card variant="quiet">Quiet — surface-2 fill, no shadow. Good for grouped content.</Card>
      <Card variant="soft">Soft — accent-soft fill with accent-ink text. Good for highlights.</Card>
    </div>
  );
}

function FieldsDemo() {
  const [value, setValue] = useState("lucide");
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field label="Title" placeholder="Morning walk in the park" />
      <Field label="Search" icon={<Search size={16} />} placeholder="Search entries" />
      <Field
        label="Mood"
        hint="How are you feeling today?"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Field label="Date" error="This field is required" />
    </div>
  );
}

function TextAreasDemo() {
  return (
    <div className="space-y-6">
      <TextArea
        label="Reflection"
        placeholder="Write what happened today"
        defaultValue="The morning started with a long walk through the park. The light through the trees was extraordinary."
      />
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink3">
          Bare variant for inline editing
        </p>
        <Card variant="flat">
          <TextArea
            bare
            rows={3}
            defaultValue="This textarea has no border or background, used for inline transcript editing inside cards."
          />
        </Card>
      </div>
    </div>
  );
}

function ChipsDemo() {
  const [selected, setSelected] = useState<string | null>("Focus");
  const tags = ["Focus", "Exercise", "Family", "Work"];
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {tags.map((tag) => (
        <Chip
          key={tag}
          selected={selected === tag}
          onClick={() => setSelected(selected === tag ? null : tag)}
        >
          {tag}
        </Chip>
      ))}
      <Chip selected icon={<Flame size={14} />}>
        Gratitude
      </Chip>
      <Chip>Plain tag (no onClick)</Chip>
    </div>
  );
}

function TogglesDemo() {
  const [push, setPush] = useState(true);
  const [weekly, setWeekly] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-3">
        <Toggle checked={push} onChange={setPush} label="Push notifications" />
        <span className="text-sm text-ink2">Push notifications</span>
      </div>
      <div className="flex items-center gap-3">
        <Toggle checked={weekly} onChange={setWeekly} label="Weekly recap" />
        <span className="text-sm text-ink2">Weekly recap</span>
      </div>
      <div className="flex items-center gap-3">
        <Toggle checked disabled label="Disabled on" />
        <span className="text-sm text-ink2">Disabled</span>
      </div>
    </div>
  );
}

function AvatarsDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="BC" size={28} />
      <Avatar name="Bhanu" size={36} />
      <Avatar name="Ana Sofia" size={48} />
      <Avatar name="Marcus Bell" size={56} />
      <Avatar name="" size={36} />
    </div>
  );
}

function ToastDemo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="primary"
        onClick={() =>
          toast("Entry saved", {
            description: "Your reflection is safe and sound.",
          })
        }
      >
        Show default toast
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast("Careful", {
            variant: "warn",
            description: "This action cannot be undone.",
          })
        }
      >
        Show warn toast
      </Button>
      <Button variant="surface" onClick={() => toast("Quick toast")}>
        Quick toast
      </Button>
    </div>
  );
}

function ModalsDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destructive, setDestructive] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="surface" onClick={() => setModalOpen(true)}>
        Open modal
      </Button>
      <Button
        variant="surface"
        onClick={() => {
          setDestructive(false);
          setConfirmOpen(true);
        }}
      >
        Confirm dialog
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          setDestructive(true);
          setConfirmOpen(true);
        }}
      >
        Destructive confirm
      </Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New entry">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-ink2">
            This modal traps focus, closes on Escape or scrim click, and accepts
            arbitrary children.
          </p>
          <Field label="Title" placeholder="Optional title for the entry" />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title={destructive ? "Delete entry?" : "Discard changes?"}
        description={
          destructive
            ? "This permanently removes the entry and its transcript. This cannot be undone."
            : "You have unsaved changes. They will be lost."
        }
        confirmLabel={destructive ? "Delete" : "Discard"}
        destructive={destructive}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
      />
    </div>
  );
}

function SkeletonsDemo() {
  return (
    <div className="space-y-3">
      <Skeleton width={260} height={16} />
      <Skeleton width={340} height={16} />
      <Skeleton width="100%" height={12} />
      <Skeleton width={64} height={64} rounded="full" />
    </div>
  );
}

function SpinnersDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Spinner size={14} />
        <span className="text-sm text-ink2">Small</span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner size={18} />
        <span className="text-sm text-ink2">Medium</span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner size={24} />
        <span className="text-sm text-ink2">Large</span>
      </div>
    </div>
  );
}

function StatsDemo() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <Stat value={47} label="Day streak" />
      <Stat value={128} label="Entries" accent />
      <Stat value="12h 40m" label="Time recorded" />
      <Stat value="86%" label="Consistency" accent />
    </div>
  );
}

function BarChartsDemo() {
  const values = [24, 68, 40, 90, 55, 72, 33, 84, 61, 47, 78, 28];
  return (
    <div className="space-y-8">
      <BarChart values={values} height={96} />
      <div className="flex flex-wrap items-end gap-8">
        <div className="w-40">
          <BarChart values={[60, 0, 35, 100, 0]} height={64} />
        </div>
        <div className="w-40">
          <BarChart values={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} height={64} />
        </div>
      </div>
    </div>
  );
}

function WaveformsDemo() {
  const [live, setLive] = useState(true);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-6">
        <WaveformIcon live={live} size={24} />
        <WaveformIcon live={live} size={32} />
        <WaveformIcon live={live} size={48} />
        <div className="flex items-center gap-2.5">
          <Toggle checked={live} onChange={setLive} label="Toggle live animation" />
          <span className="text-sm text-ink2">Live</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-xs font-medium uppercase tracking-wider text-ink3">
        <span className="flex items-center gap-2">
          <WaveformIcon size={20} />
          Static
        </span>
        <span className="flex items-center gap-2">
          <WaveformIcon live size={20} />
          Animated
        </span>
      </div>
    </div>
  );
}

function PageContent() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-ink3">
          Component kit
        </p>
        <h1 className="mt-2 font-serif text-4xl text-ink">Debug — Components</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink2">
          Every primitive component and variant, rendered against the design
          tokens. Delete this page before shipping.
        </p>
      </header>

      <Section title="Button">
        <ButtonsDemo />
      </Section>
      <Section title="Card">
        <CardsDemo />
      </Section>
      <Section title="Field">
        <FieldsDemo />
      </Section>
      <Section title="TextArea">
        <TextAreasDemo />
      </Section>
      <Section title="Chip">
        <ChipsDemo />
      </Section>
      <Section title="Toggle">
        <TogglesDemo />
      </Section>
      <Section title="Avatar">
        <AvatarsDemo />
      </Section>
      <Section title="Toast">
        <ToastDemo />
      </Section>
      <Section title="Modal / ConfirmDialog">
        <ModalsDemo />
      </Section>
      <Section title="Skeleton">
        <SkeletonsDemo />
      </Section>
      <Section title="Spinner">
        <SpinnersDemo />
      </Section>
      <Section title="Stat">
        <StatsDemo />
      </Section>
      <Section title="BarChart">
        <BarChartsDemo />
      </Section>
      <Section title="WaveformIcon">
        <WaveformsDemo />
      </Section>

      <p className="pt-6 text-center text-xs text-ink3">
        Generated by the component kit debug page — safe to delete.
      </p>
    </main>
  );
}

export default function DebugComponentsPage() {
  return (
    <ToastProvider>
      <PageContent />
    </ToastProvider>
  );
}