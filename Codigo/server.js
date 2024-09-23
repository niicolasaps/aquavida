import http from 'http';
import { parse } from 'url';
import { clienteController } from './src/lib/db/schema/cliente/controller.ts';
import { representanteController } from './src/lib/db/schema/representante/controller.ts';
import { servicoController } from './src/lib/db/schema/servico/controller.ts';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    const parsedUrl = parse(url, true);

    res.setHeader('Content-Type', 'application/json');

    // Rotas de Cliente
    if (parsedUrl.pathname === '/api/cliente' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const result = await clienteController.insertCliente(data);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Error inserting client' }));
            }
        });
    } else if (parsedUrl.pathname === '/api/cliente' && method === 'GET') {
        try {
            const clients = await clienteController.selectAllClientes();
            res.statusCode = 200;
            res.end(JSON.stringify(clients));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error fetching clients' }));
        }
    }

    // Rotas de Representante
    else if (parsedUrl.pathname === '/api/representante' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const result = await representanteController.insertRepresentante(data);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Error inserting representative' }));
            }
        });
    } else if (parsedUrl.pathname === '/api/representante' && method === 'GET') {
        try {
            const representantes = await representanteController.selectAllRepresentantes();
            res.statusCode = 200;
            res.end(JSON.stringify(representantes));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error fetching representatives' }));
        }
    }

    // Rotas de Serviço
    else if (parsedUrl.pathname === '/api/servico' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const result = await servicoController.insertServico(data);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Error inserting service' }));
            }
        });
    } else if (parsedUrl.pathname === '/api/servico' && method === 'GET') {
        try {
            const servicos = await servicoController.selectAllServicos();
            res.statusCode = 200;
            res.end(JSON.stringify(servicos));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error fetching services' }));
        }
    }

    // Se não encontrou a rota
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
