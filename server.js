const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Permitir CORS para todos os domínios (apenas para desenvolvimento)
app.use(cors());

// Permitir que o servidor entenda JSON no body da requisição
app.use(express.json());

// Endpoint para intermediar a requisição à API da Melhor Envio
app.post('/calculate-shipment', async (req, res) => {
  const { from, to, package } = req.body;

  try {
    const response = await axios.post(
      'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
      { from, to, package },
      {
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjhkMTNkYWNiNTJkNDMwMzNjNjk2ZTY1MjU2MjQ4MTc0NjM0NjNmZWYzYWExYjI3NGYxYjM4NTVlYzM1ZDUzNTYzZTY1M2ZmNTg1Zjg4ODYiLCJpYXQiOjE3MjYwODk5NzIuMjExNjUzLCJuYmYiOjE3MjYwODk5NzIuMjExNjU0LCJleHAiOjE3NTc2MjU5NzIuMTk3MjkyLCJzdWIiOiIwYmQ0YjY1NC04OTI0LTRlYzUtYTRmMC05NGIzYmVmY2QzM2IiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.pSiocmZKLxsqjRDVko0Te6ly3PKTbi9WXrFVzYoogTqkqFETxU2gPyjUAnJduzeT6z0cqmyPxXrF3OdwrdfX2CVcSvFWhlfK8AB1RNUC1tErTR63LfAOIb9QBxK-WIXVCb-c5hWiX6iYqUsZggOehuDGWsvyj7zvZsxzYh8r05b_SSXYscY6iJg3utbni4GgreVsSt5etd5GouPK6v-kMCaIBHjiTyydWHsrJJ8ThwEK6w33z57_EkwLSDhHaJvg3R-HadRyIs7rCUmQre-vWhyYED0ypfqUlGzt7Zu702fYQJq2_R6qfnvIalSF9bk1Zc8q4sGU-Fga-Yi6BmJLeRQBVBgv_c78aLJYQhG_rv7AtRkzkQZ3oUfr2pQt9KZ29QI3Lz8OAu6YnWEVNDWyXCuh0MtAKZL4bgry1jMF_EhlKfQTzKZrt5hxmpqBA2ThxAZ7cQuwcQu3T-3KrQYo9VjIrjMecLNfoUnhL2GLCCuGn9Kh5E_-MEKCjYNdpLCRJslf3vZJkd4kveSxvnMaidVDE2xuwnA85QzzBH62wO38jNv0us8XDyhuVeTt38m7tUyblncaHNrgnDOSqURUxFH-PboBek2tDW5FbnYWelF8KmtsQsN4BkOlxmW9-bglWa-t3XiAx91QStOMroDRtFiyufDnDS53xLo8MEWjAM4', // Substitua pelo seu token
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Aplicação haralan_santana@hotmail.com', // Substitua pelo seu e-mail ou nome da aplicação
        },
      }
    );

    // Enviar a resposta da API da Melhor Envio de volta para o frontend
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao calcular o frete:', error.message);

    // Verificar se houve resposta da API da Melhor Envio
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Erro ao calcular o frete' });
    }
  }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
