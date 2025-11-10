import { useState } from "react";
import { gerarSUCI } from "../services/suciService";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ResultBox from "../components/ResultBox";
import { QRCodeCanvas } from "qrcode.react";

import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function Home() {
  const [supi, setSupi] = useState("");
  const [loading, setLoading] = useState(false);
  const [suci, setSuci] = useState("");
  const [supiOriginal, setSupiOriginal] = useState("");
  const [steps, setSteps] = useState([]);

  const addStep = async (msg, delay = 600) => {
    setSteps((prev) => [...prev, msg]);
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  const handleGerar = async () => {
    setSteps([]);
    setLoading(true);

    try {
      await addStep("🔑 Gerando par de chaves efêmeras do UE...");
      await addStep("📡 Obtendo chave pública da operadora...");
      await addStep("🤝 Realizando ECDH para segredo compartilhado...");
      await addStep("🔒 Derivando chave AES a partir do segredo...");
      await addStep("🧩 Criptografando SUPI -> gerando SUCI...");
      await addStep("📨 Enviando SUCI para operadora testar descriptografia...");

      const result = await gerarSUCI(supi);
      setSuci(result.suci);
      setSupiOriginal(result.supiDescriptografado);

      await addStep("✅ Operadora descriptografou o SUCI com sucesso!");

    } catch (err) {
      console.error(err);
      await addStep("❌ Erro ao gerar SUCI");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🔐 Gerador de SUCI (5G - ECDH)
      </Typography>

      <InputField
        label="Digite o SUPI"
        value={supi}
        onChange={(e) => setSupi(e.target.value)}
      />

      <Button
        text="Gerar SUCI"
        loading={loading}
        disabled={loading || !supi}
        onClick={handleGerar}
      />

      {steps.length > 0 && (
        <ResultBox title="🧪 Processo de Criptografia">
          <List dense>
            {steps.map((item, i) => (
              <ListItem key={i}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>

          <Divider />

          {suci && (
            <>
              <Typography variant="subtitle1" style={{ marginTop: 20 }}>
                ✅ SUCI gerado:
              </Typography>
              <Typography variant="body2" style={{ wordBreak: "break-all" }}>
                {suci}
              </Typography>

              <Typography variant="subtitle1" style={{ marginTop: 20 }}>
                ✅ SUPI restaurado pela operadora:
              </Typography>
              <Typography variant="body2">{supiOriginal}</Typography>

              {/* QR CODE */}
              <div style={{ marginTop: 20, justifyContent: "center", display: "flex" }}>
                <QRCodeCanvas value={suci} size={180} />
              </div>
            </>
          )}
        </ResultBox>
      )}
    </Container>
  );
}
