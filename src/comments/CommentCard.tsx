import { Comment } from '../shared/types';
import { Card } from '../shared/components';
import { Heart } from 'lucide-react';

interface CommentCardProps {
  comment: Comment;
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'recently';
  }
}

export function CommentCard({ comment }: CommentCardProps) {
  const formattedDate = formatDate(comment.createdAt);

  return (
    <Card variant="subtle">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-1">
          <h4 className="font-serif font-medium text-brand-dark">
            {comment.guestName}
          </h4>
          <p className="text-sm text-brand-text/60">{formattedDate}</p>
        </div>
        <Heart size={18} className="text-brand-gold/50 flex-shrink-0 mt-1" />
      </div>
      <p className="text-brand-text/80 leading-relaxed whitespace-pre-wrap">
        {comment.message}
      </p>
    </Card>
  );
}
