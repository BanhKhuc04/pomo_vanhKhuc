import React from 'react'
import ColorPicker from './ColorPicker'
import OutfitSelector from './OutfitSelector'
import OptionChip from './OptionChip'

function SectionTitle({ children }) {
  return (
    <div className="text-white/80 text-[12px] tracking-[0.16em] uppercase font-semibold">
      {children}
    </div>
  )
}

export default function CustomizationPanel({ value, options, onChange }) {
  return (
    <div
      className="w-full rounded-[28px] border border-white/10 bg-[#0B0B1E]/70 shadow-[0_22px_70px_rgba(0,0,0,0.55)] overflow-hidden"
      style={{ backdropFilter: 'blur(14px)' }}
    >
      <div className="px-5 pt-4 pb-3">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-white/15" />
        <div className="mt-3 text-[16px] font-extrabold tracking-tight">
          Customize
        </div>
        <div className="mt-1 text-white/65 text-[13px]">
          Tap to mix, match, and make it yours.
        </div>
      </div>

      <div className="px-5 pb-5 space-y-5 max-h-[40vh] overflow-y-auto custom-scrollbar">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <SectionTitle>Skin tone</SectionTitle>
          <div className="mt-3">
            <ColorPicker
              value={value.skinTone}
              options={options.skinTone || []}
              onChange={(id) => onChange('skinTone', id)}
              variant="pill"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <SectionTitle>Hair style</SectionTitle>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {(options.hairStyle || []).map(o => (
              <OptionChip
                key={o.id}
                selected={value.hairStyle === o.id}
                onClick={() => onChange('hairStyle', o.id)}
              >
                <span className="mr-1">{o.emoji}</span>
                {o.label}
              </OptionChip>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <SectionTitle>Hair color</SectionTitle>
          <div className="mt-3">
            <ColorPicker
              value={value.hairColor}
              options={options.hairColor || []}
              onChange={(id) => onChange('hairColor', id)}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <SectionTitle>Outfit</SectionTitle>
          <div className="mt-3">
            <OutfitSelector
              value={value.outfit}
              options={options.outfit || []}
              onChange={(id) => onChange('outfit', id)}
            />
          </div>
          <div className="mt-4">
            <SectionTitle>Outfit color</SectionTitle>
            <div className="mt-3">
              <ColorPicker
                value={value.outfitColor}
                options={options.outfitColor || []}
                onChange={(id) => onChange('outfitColor', id)}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <SectionTitle>Accessory</SectionTitle>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {(options.accessory || []).map(o => (
              <OptionChip
                key={o.id}
                selected={value.accessory === o.id}
                onClick={() => onChange('accessory', o.id)}
              >
                <span className="mr-1">{o.emoji}</span>
                {o.label}
              </OptionChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

