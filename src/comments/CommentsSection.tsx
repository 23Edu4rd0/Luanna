import { useState } from 'react';
import { Button, SectionTitle, Card } from '../shared/components';
import { CommentCard } from './CommentCard';
import { useComments } from '../shared/hooks';
import { isValidMessage, isValidName } from './comments.service';

export function CommentsSection() {
  const { comments, loading, error, addComment } = useComments();
  const [showForm, setShowForm] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!isValidName(guestName)) {
      setFormError('Por favor, digite um nome válido (1-100 caracteres)');
      return;
    }

    if (!isValidMessage(message)) {
      setFormError('A mensagem deve ter entre 1-500 caracteres');
      return;
    }

    setIsSubmitting(true);
    const success = await addComment(guestName, message, guestEmail || undefined);

    if (success) {
      setGuestName('');
      setGuestEmail('');
      setMessage('');
      setShowForm(false);
    } else {
      setFormError('Falha ao adicionar mensagem. Tente novamente.');
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-brand-beige/20">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Mensagens e Desejos"
          subtitle="Compartilhe seu amor e apoio para o casal feliz"
        />

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Add comment button/form */}
        {!showForm ? (
          <div className="mb-12 text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowForm(true)}
            >
              Deixe Seus Desejos
            </Button>
          </div>
        ) : (
          <Card className="mb-12 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      setFormError('');
                    }}
                    placeholder="Digite seu nome"
                    className="w-full px-4 py-2 border border-brand-beige/50 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-colors"
                    disabled={isSubmitting}
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2 border border-brand-beige/50 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Sua Mensagem *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setFormError('');
                  }}
                  placeholder="Compartilhe seus desejos e bênçãos..."
                  className="w-full px-4 py-2 border border-brand-beige/50 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-colors resize-none"
                  rows={4}
                  disabled={isSubmitting}
                  maxLength={500}
                />
                <p className="text-xs text-brand-text/50 mt-1">
                  {message.length}/500 caracteres
                </p>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {formError}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setGuestName('');
                    setGuestEmail('');
                    setMessage('');
                    setFormError('');
                  }}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Enviar Desejos
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Comments list */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-brand-text/60">Carregando mensagens...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-brand-text/60">
                  Nenhuma mensagem ainda. Seja o primeiro a compartilhar seus desejos!
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
