// No início do admin.js
document.addEventListener('DOMContentLoaded', async function() {
    // Desativar funcionalidades de edição
    document.getElementById('addProductBtn').style.display = 'none';
    document.getElementById('saveJsonBtn').style.display = 'none';
    document.getElementById('loadJsonBtn').style.display = 'none';
    document.getElementById('resetDataBtn').style.display = 'none';
    document.getElementById('adminForm').style.display = 'none';
    
    // Alterar texto do botão
    document.getElementById('adminToggle').textContent = 'Visualizar Produtos';
    
    // Mensagem informativa
    const adminHeader = document.querySelector('.admin-header');
    const infoMessage = document.createElement('div');
    infoMessage.className = 'status-message status-warning';
    infoMessage.innerHTML = '<strong>Modo de Visualização:</strong> Os dados são carregados do arquivo produtos.json. Edições não são permitidas.';
    adminHeader.parentNode.insertBefore(infoMessage, adminHeader.nextSibling);
    
    // Resto do código para carregar e exibir produtos...
});