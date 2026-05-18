import { SectionTitle, Card } from '../shared/components';
import { TIMELINE_EVENTS, COUPLE_STORY } from './story.service';

function TimelineItem({ event, isLeft }: { event: typeof TIMELINE_EVENTS[0]; isLeft: boolean }) {
  return (
    <div className={`flex gap-8 md:gap-12 items-start md:items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline content */}
      <div className="flex-1">
        <Card variant="subtle">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-serif font-medium text-brand-gold">
              {event.date}
            </span>
            <div className="flex-1 h-px bg-brand-gold/30" />
          </div>
          <h4 className="text-xl md:text-2xl font-serif font-medium mb-3">
            {event.title}
          </h4>
          <p className="text-brand-text/80 leading-relaxed">
            {event.description}
          </p>
        </Card>
      </div>

      {/* Timeline image */}
      <div className="hidden md:block w-40 h-40 rounded-lg overflow-hidden bg-brand-beige/50 shadow-sm flex-shrink-0">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23f5f0eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23c5b358' text-anchor='middle' dominant-baseline='middle'%3E${event.title}%3C/text%3E%3C/svg%3E`;
          }}
        />
      </div>
    </div>
  );
}

export function StorySection() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Nossa História"
          subtitle="Do momento em que nos conhecemos até este dia lindo"
        />

        {/* Main story text */}
        <div className="mb-16 md:mb-20 text-center">
          <p className="text-lg md:text-xl text-brand-text/80 leading-relaxed max-w-2xl mx-auto">
            {/* ✏️ EDITAR: Atualize a história do casal */}
            {COUPLE_STORY}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12 md:space-y-16">
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
