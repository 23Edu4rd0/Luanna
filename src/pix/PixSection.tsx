import { Copy, QrCode } from 'lucide-react';
import { Card, SectionTitle, Button } from '../shared/components';
import { useWeddingConfig } from '../shared/hooks';

interface GiftPaymentOption {
  name: string;
  price: number;
}

const GIFT_PAYMENTS: GiftPaymentOption[] = [
  { name: 'Cozinha completa', price: 300 },
  { name: 'Quarto do casal', price: 220 },
  { name: 'Banheiro coordenado', price: 160 },
  { name: 'Detalhes da casa', price: 120 },
];

export function PixSection() {
  const { config } = useWeddingConfig();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(config.pixKey);
    alert('Chave PIX copiada!');
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-brand-beige/20">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Contribuição com PIX" subtitle="Escolha um valor sugerido ou contribua livremente" />

        {/* Main PIX Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* PIX Key Card */}
          <Card>
            <h3 className="text-xl font-serif font-medium mb-4">
              Chave PIX
            </h3>
            <div className="space-y-4">
              <div className="bg-brand-gold/10 p-4 rounded-lg border border-brand-gold/30">
                <p className="text-sm text-brand-text/70 mb-2 uppercase tracking-wide font-medium">
                  Copie e cole no seu banco
                </p>
                <p className="font-mono text-sm break-all text-brand-text mb-3">
                  {config.pixKey}
                </p>
                <Button
                  onClick={handleCopyKey}
                  variant="primary"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Copy size={16} />
                  Copiar Chave
                </Button>
              </div>
            </div>
          </Card>

          {/* QR Code Card */}
          <Card>
            <h3 className="text-xl font-serif font-medium mb-4">
              Código QR
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-brand-beige/50 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <QrCode size={64} className="mx-auto mb-2 text-brand-gold" />
                  <p className="text-sm text-brand-text/60">
                    Escaneie com seu celular
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Gift Suggestions */}
        <div>
          <h3 className="text-2xl font-serif font-medium mb-6 text-center">
            Valores Sugeridos
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GIFT_PAYMENTS.map((gift, index) => (
              <Card key={index} variant="subtle">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif font-medium mb-1">
                      {gift.name}
                    </h4>
                    <p className="text-brand-gold text-lg font-serif font-medium">
                      R$ {gift.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div className="text-right text-xs text-brand-text/60 bg-brand-gold/10 px-2 py-1 rounded">
                    PIX
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-12 bg-brand-gold/5 border border-brand-gold/20">
          <h4 className="font-serif font-medium mb-4 text-lg">
            📝 Como Contribuir
          </h4>
          <ol className="space-y-3 text-brand-text/80">
            <li className="flex gap-3">
              <span className="font-serif font-medium text-brand-gold min-w-6">
                1.
              </span>
              <span>Abra seu banco ou aplicativo de pagamento</span>
            </li>
            <li className="flex gap-3">
              <span className="font-serif font-medium text-brand-gold min-w-6">
                2.
              </span>
              <span>
                Escolha a opção PIX e selecione "Chave aleatória" ou "Código QR"
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-serif font-medium text-brand-gold min-w-6">
                3.
              </span>
              <span>
                Cole a chave PIX acima ou escaneie o código QR com a câmera
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-serif font-medium text-brand-gold min-w-6">
                4.
              </span>
              <span>
                Digite o valor desejado e confirme a transferência
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-serif font-medium text-brand-gold min-w-6">
                5.
              </span>
              <span>
                Pronto! Sua contribuição foi recebida com gratidão 💕
              </span>
            </li>
          </ol>
        </Card>

        {/* Thank You Message */}
        <div className="mt-12 text-center">
          <p className="text-lg text-brand-text/80 max-w-2xl mx-auto">
            Cada contribuição, grande ou pequena, significa muito para nós. Muito obrigado por fazer parte desta celebração especial! ✨
          </p>
        </div>
      </div>
    </section>
  );
}
