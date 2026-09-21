with open("components/CandidatesExplorer.tsx") as f:
    text = f.read()

# 1. Update CandidateDetailRow to show pollShare, biography, platformStance, and sourceVerification
old_detail_row = """function CandidateDetailRow({ candidate: c, rank, totalInRace }: {
  candidate: Candidate; rank: number; totalInRace: number;
}) {
  const col = PARTY_COLORS[c.party] || PARTY_COLORS.NP;
  const statusColor = STATUS_COLORS[c.status] || '#64748B';

  return (
    <div className="px-4 py-3 flex items-start gap-3 hover:bg-[#F6F8FB] transition-colors">
      {/* Rank badge */}
      <div className="w-6 h-6 rounded-full bg-[#F0F4F8] border border-[#E4E9F0] flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-[10px] font-bold text-[#8494A8]">{rank}</span>
      </div>

      {/* Party dot */}
      <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5 border-2"
        style={{ backgroundColor: col.dot, borderColor: col.border }} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-[#0B1220]">{c.name}</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
            style={{ backgroundColor: col.bg, color: col.text, borderColor: col.border }}>
            {c.party}
          </span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ color: statusColor, backgroundColor: `${statusColor}15` }}>
            {c.status}
          </span>
          {c.status === 'Incumbent' && (
            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#16A34A' }} />
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
          {c.priorOffice && (
            <div className="flex items-center gap-1 text-[11px] text-[#5B6779]">
              <Briefcase className="w-3 h-3 flex-shrink-0" />
              <span>{c.priorOffice}</span>
            </div>
          )}
          {c.hometown && (
            <div className="flex items-center gap-1 text-[11px] text-[#8494A8]">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>{c.hometown}</span>
            </div>
          )}
          {c.age && (
            <div className="flex items-center gap-1 text-[11px] text-[#8494A8]">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>Age {c.age}</span>
            </div>
          )}
          {c.cashOnHandMillions && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#16A34A]">
              <DollarSign className="w-3 h-3 flex-shrink-0" />
              <span>${c.cashOnHandMillions.toFixed(1)}M cash on hand</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}"""

new_detail_row = """function CandidateDetailRow({ candidate: c, rank, totalInRace }: {
  candidate: Candidate; rank: number; totalInRace: number;
}) {
  const col = PARTY_COLORS[c.party] || PARTY_COLORS.NP;
  const statusColor = STATUS_COLORS[c.status] || '#64748B';

  return (
    <div className="px-4 py-3.5 flex items-start gap-3 hover:bg-[#F6F8FB] transition-colors border-b border-[#F0F4F8] last:border-b-0">
      {/* Rank badge */}
      <div className="w-6 h-6 rounded-full bg-[#F0F4F8] border border-[#E4E9F0] flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-[10px] font-bold text-[#8494A8]">{rank}</span>
      </div>

      {/* Party dot */}
      <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5 border-2"
        style={{ backgroundColor: col.dot, borderColor: col.border }} />

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#0B1220]">{c.name}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
              style={{ backgroundColor: col.bg, color: col.text, borderColor: col.border }}>
              {c.party}
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ color: statusColor, backgroundColor: `${statusColor}15` }}>
              {c.status}
            </span>
            {c.status === 'Incumbent' && (
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-[#16A34A]" />
            )}
          </div>

          {c.pollShare && (
            <div className="flex items-center gap-1.5 bg-[#EBF3FD] border border-[#BFDBFE] px-2.5 py-0.5 rounded-full">
              <span className="text-[10px] text-[#0A4E9E] font-medium">Certified Poll Share:</span>
              <strong className="text-xs text-[#0E63C4] font-mono">{c.pollShare}%</strong>
            </div>
          )}
        </div>

        {/* Biography & Platform */}
        {c.biography && (
          <p className="text-xs text-[#334155] leading-relaxed pt-0.5">
            <strong>Bio:</strong> {c.biography}
          </p>
        )}
        {c.platformStance && (
          <p className="text-xs text-[#475569] leading-relaxed">
            <strong>Platform:</strong> {c.platformStance}
          </p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] text-[#5B6779]">
          {c.priorOffice && (
            <div className="flex items-center gap-1">
              <Briefcase className="w-3 h-3 flex-shrink-0" />
              <span>{c.priorOffice}</span>
            </div>
          )}
          {c.hometown && (
            <div className="flex items-center gap-1 text-[#8494A8]">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>{c.hometown}</span>
            </div>
          )}
          {c.age && (
            <div className="flex items-center gap-1 text-[#8494A8]">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>Age {c.age}</span>
            </div>
          )}
          {c.cashOnHandMillions !== undefined && (
            <div className="flex items-center gap-1 font-semibold text-[#16A34A]">
              <DollarSign className="w-3 h-3 flex-shrink-0" />
              <span>${c.cashOnHandMillions < 0.1 ? Math.round(c.cashOnHandMillions * 1000) + 'k' : c.cashOnHandMillions.toFixed(1) + 'M'} cash on hand</span>
            </div>
          )}
          {c.sourceVerification && (
            <div className="flex items-center gap-1 text-[#047857] bg-[#ECFDF5] px-1.5 py-0.2 rounded border border-[#A7F3D0]">
              <CheckCircle className="w-3 h-3" />
              <span>Filing: {c.sourceVerification.filingId} ({c.sourceVerification.verificationStatus})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}"""

text = text.replace(old_detail_row, new_detail_row)

with open("components/CandidatesExplorer.tsx", "w") as f:
    f.write(text)

print("Successfully updated components/CandidatesExplorer.tsx with candidate biographies, polling share, and verification IDs!")
