import React from 'react'
import ColorPicker from './ColorPicker'
import OutfitSelector from './OutfitSelector'
import OptionChip from './OptionChip'
import AvatarCharacter from '../../../components/Character/AvatarCharacter'

function SectionTitle({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#C89B6D] bg-[#FFF7E8] px-3 py-1.5 shadow-[0_3px_0_#E3C591]">
      <span>{icon}</span>
      <span className="pixel-text text-[9px] uppercase tracking-[0.12em] text-[#8B5E34]">{children}</span>
    </div>
  )
}

export default function CustomizationPanel({ value, options, onChange }) {
  const makePreviewConfig = (patch) => ({ ...value, ...patch })

  return (
    <div
      className="w-full overflow-hidden rounded-[28px] border-[4px] border-[#A9784A] bg-[#F6EBD3] shadow-[0_8px_0_#D7B680,0_16px_30px_rgba(118,87,56,0.18)]"
    >
      <div className="border-b-[4px] border-[#D9BB87] bg-[linear-gradient(180deg,#FFF7E8_0%,#F4E3C3_100%)] px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#8B5E34] bg-[#C89B6D] px-3 py-1.5 shadow-[0_4px_0_#8B5E34]">
          <span className="text-[#FFF7E8]">🧺</span>
          <span className="pixel-text text-[9px] uppercase tracking-[0.12em] text-[#FFF7E8]">Customize</span>
        </div>
        <div className="mt-3 retro-text text-[34px] leading-none text-[#4B3425]">
          Customize
        </div>
        <div className="mt-2 text-[14px] leading-relaxed text-[#6D5640]">
          Tap to mix, match, and make it yours.
        </div>
      </div>

      <div className="space-y-4 px-4 py-4 lg:max-h-[64vh] lg:overflow-y-auto custom-scrollbar">
        <div className="rounded-[24px] border-[3px] border-[#D5B27B] bg-[#FFF7E8] p-4 shadow-[0_4px_0_#E7D1A9]">
          <SectionTitle icon="🎨">Skin tone</SectionTitle>
          <div className="mt-3">
            <ColorPicker
              value={value.skinTone}
              options={options.skinTone || []}
              onChange={(id) => onChange('skinTone', id)}
              variant="pill"
            />
          </div>
        </div>

        <div className="rounded-[24px] border-[3px] border-[#D5B27B] bg-[#FFF7E8] p-4 shadow-[0_4px_0_#E7D1A9]">
          <SectionTitle icon="🌾">Hair style</SectionTitle>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(options.hairStyle || []).map(o => (
              <OptionChip
                key={o.id}
                selected={value.hairStyle === o.id}
                onClick={() => onChange('hairStyle', o.id)}
                className="min-h-[160px] p-3"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex min-h-[88px] w-full items-center justify-center rounded-[18px] border-[3px] border-[#D5B27B] bg-[linear-gradient(180deg,#DFF1FF_0%,#F8F3E7_100%)]">
                    <div className="scale-[1.15]">
                      <AvatarCharacter config={makePreviewConfig({ hairStyle: o.id })} size="sm" useAssets={false} />
                    </div>
                  </div>
                  <div className="text-[24px] leading-none">{o.emoji}</div>
                  <div className="pixel-text text-[9px] uppercase tracking-[0.1em] text-[#6B4A2E]">{o.label}</div>
                </div>
              </OptionChip>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border-[3px] border-[#D5B27B] bg-[#FFF7E8] p-4 shadow-[0_4px_0_#E7D1A9]">
          <SectionTitle icon="🪮">Hair color</SectionTitle>
          <div className="mt-3">
            <ColorPicker
              value={value.hairColor}
              options={options.hairColor || []}
              onChange={(id) => onChange('hairColor', id)}
            />
          </div>
        </div>

        <div className="rounded-[24px] border-[3px] border-[#D5B27B] bg-[#FFF7E8] p-4 shadow-[0_4px_0_#E7D1A9]">
          <SectionTitle icon="🧺">Outfit</SectionTitle>
          <div className="mt-3">
            <OutfitSelector
              value={value.outfit}
              options={options.outfit || []}
              onChange={(id) => onChange('outfit', id)}
              renderPreview={(option) => (
                <div className="scale-[1.2]">
                  <AvatarCharacter config={makePreviewConfig({ outfit: option.id })} size="sm" useAssets={false} />
                </div>
              )}
            />
          </div>
        </div>

        <div className="rounded-[24px] border-[3px] border-[#D5B27B] bg-[#FFF7E8] p-4 shadow-[0_4px_0_#E7D1A9]">
          <SectionTitle icon="🧵">Outfit color</SectionTitle>
          <div className="mt-3">
            <ColorPicker
              value={value.outfitColor}
              options={options.outfitColor || []}
              onChange={(id) => onChange('outfitColor', id)}
            />
          </div>
        </div>

        <div className="rounded-[24px] border-[3px] border-[#D5B27B] bg-[#FFF7E8] p-4 shadow-[0_4px_0_#E7D1A9]">
          <SectionTitle icon="🎀">Accessory</SectionTitle>
          <div className="mt-3 flex flex-wrap gap-3">
            {(options.accessory || []).map(o => (
              <OptionChip
                key={o.id}
                selected={value.accessory === o.id}
                onClick={() => onChange('accessory', o.id)}
                className="min-w-[140px] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[22px] leading-none">{o.emoji}</span>
                  <div className="text-left">
                    <div className="pixel-text text-[9px] uppercase tracking-[0.1em] text-[#6B4A2E]">{o.label}</div>
                    <div className="text-[13px] text-[#7A6147]">
                      {o.id === 'none' ? 'Keep it simple' : o.id === 'headphones' ? 'A study-day classic' : 'A cozy little prop'}
                    </div>
                  </div>
                </div>
              </OptionChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
