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
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDQ0ZGI3NjYxNmNmMTAzNzYxMTY2MTk5ZjMzODg4OGE1NzYwN2I0NzBjMWQ3N2M3NTc1YTM2MTdiNjg0ZTAxM2ViNzc1ZDU0OWUzZmNlNjQiLCJpYXQiOjE3MjYxNTQ4ODIuNjI5NzM4LCJuYmYiOjE3MjYxNTQ4ODIuNjI5NzM5LCJleHAiOjE3NTc2OTA4ODIuNjE1NzczLCJzdWIiOiI5Y2ZlMTA5Yy1mMmNkLTQyNGItYWY4Yy0xMGVkZDJkYjFmZTgiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLWRlc3Ryb3kiLCJwcm9kdWN0cy13cml0ZSIsInB1cmNoYXNlcy1yZWFkIiwic2hpcHBpbmctY2FsY3VsYXRlIiwic2hpcHBpbmctY2FuY2VsIiwic2hpcHBpbmctY2hlY2tvdXQiLCJzaGlwcGluZy1jb21wYW5pZXMiLCJzaGlwcGluZy1nZW5lcmF0ZSIsInNoaXBwaW5nLXByZXZpZXciLCJzaGlwcGluZy1wcmludCIsInNoaXBwaW5nLXNoYXJlIiwic2hpcHBpbmctdHJhY2tpbmciLCJlY29tbWVyY2Utc2hpcHBpbmciLCJ0cmFuc2FjdGlvbnMtcmVhZCIsInVzZXJzLXJlYWQiLCJ1c2Vycy13cml0ZSIsIndlYmhvb2tzLXJlYWQiLCJ3ZWJob29rcy13cml0ZSIsIndlYmhvb2tzLWRlbGV0ZSIsInRkZWFsZXItd2ViaG9vayJdfQ.QxUgMLJmrmv-xoFwV4pHYFdyq-pkV4UbPOC1MS-rPX3fojemw7YhOU0sMnWpRcvwUX3vG1SonVoxen3Z4tao7XNTYXjT3B_5KX2C5bO07XeGZ3iLNbopZksx70PQP63b0K2LhPvw3sPGDHY9SrQvEGaY6-CA45kE9PkT0cv03TbDwdV1rGlZJjrG3_YNb0AFts120dTgQPkPVGnscZ6tCKfgXn4cJaamzEoB8OeiLGOkP4ap4FRuVlMGrwAw7OZrlwCJuvQOS4KKrTV3ZJ9KIgnPiTYNLJeZePBkm9Si8X6W1hZ7KAEGyL6ImRdfJjDzXAlzNWmBPUiSKGuEud_hORSVeyyb4lFRlWJwzlNURurR3gRNla6w-KoXsjczVOVgsgFuo44V949N7DVsWeLeXZt_qid9RhZmpC2Hgym2QRYWmonqbR1yQrJlnhgFm0pLK7s16Tq-14Rvu4WgaeKGDILd967qCCx3UguHohl8Sc6pgtD5j3rp6Jrd1aKH5OOh8gzcnytzHwYERn5FTHAiX8fwQVujn5kU8ynFkuEocicno50kcXTE-RzbTw2qSrgoTawm7coiACmET3t6CQxdseffnDftadkzz6I-nEYi5m3iOTihWIxGcmD0GqAZUo3ZyAlja5ktDmFTKZ225ljJOMcOzNsFz4fzaOYZ5mqswCw', // Substitua pelo seu token
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Aplicação lucasweber321@gmail.com', // Substitua pelo seu e-mail ou nome da aplicação
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
