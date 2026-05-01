import React from 'react'

export default function PixelRoom() {
  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      <img
        src="/images/scene/cozy-girl-coder-room.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pixelated select-none opacity-20 scale-[1.04] blur-[1.5px]"
      />
      <img
        src="/images/scene/cozy-girl-coder-room.png"
        alt="Cozy Room"
        className="absolute inset-0 w-full h-full object-cover object-center pixelated select-none"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 63%, rgba(255,176,102,0.14) 0%, rgba(255,176,102,0.04) 25%, rgba(0,0,0,0) 48%), radial-gradient(circle at 62% 19%, rgba(88,111,255,0.14) 0%, rgba(88,111,255,0.04) 26%, rgba(0,0,0,0) 58%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,9,29,0.04) 0%, rgba(10,9,29,0.02) 42%, rgba(9,9,21,0.16) 100%)',
        }}
      />
      <div className="absolute inset-0 border border-[#3F3676] rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(82,66,150,0.32)]" />
      <div className="absolute inset-0 rounded-[inherit]" style={{ boxShadow: 'inset 0 -34px 70px rgba(8,7,22,0.26), inset 0 18px 40px rgba(10,10,25,0.14)' }} />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.24), rgba(255,255,255,0.24) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
