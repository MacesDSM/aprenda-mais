import React from 'react';
import './sobre.css';
import { Footer, Navbar } from '../../components';
import { UsuarioService } from '../../service';


const usuarioService = new UsuarioService();

export function Sobre() {
  const handleInscrever = () => {
    alert('Você será redirecionado para a página de cadastro!');
  };

  const usuarioLogado = usuarioService.findById(usuarioService.getUsuarioLogado()?.id);

  return (
    <>
    <Navbar />
    <div className="sobre-container">
      <div className="sobre-cabecalho">
        <h1>Sobre o Projeto & Desenvolvedores</h1>
        <p>Conheça mais sobre nós e nossa proposta</p>
      </div>

      <div className="grid-destaques">
        <div className="card-destaque">
          <h3>Conhecimento sem barreiras</h3>
          <p>Acreditamos que o conhecimento deve ser acessível para todos, em qualquer lugar e a qualquer momento.</p>
        </div>
        <div className="card-destaque">
          <h3>Equipe de Desenvolvedores & Colaboradores</h3>
          <p>Somos um grupo de estudantes e profissionais apaixonados por tecnologia e educação, trabalhando juntos para criar soluções úteis e acessíveis.</p>
        </div>
      </div>

      <section className="secao">
        <h2>Nosso compromisso com você</h2>
        <p>Estamos aqui para oferecer conteúdo de qualidade, sempre gratuito e acessível, respeitando seu ritmo e sua forma de aprender.</p>
      </section>

      <section className="secao">
        <h2>Como Funciona a Conquista?</h2>
        <p>Nosso conteúdo é organizado em trilhas e níveis. Você aprende no seu tempo, acumula conhecimento e avança conforme se sente preparado.</p>
      </section>

      <section className="secao">
        <h2>Sem Prepayments ou Taxas</h2>
        <p>Todo o conteúdo principal é e continuará sendo gratuito. Não há taxas ocultas, não há assinaturas obrigatórias — conhecimento livre.</p>
      </section>

      <section className="secao">
        <h2>Desenvolvimento & Evolução</h2>
        <p>O projeto está em constante evolução. Sempre estamos adicionando novos conteúdos, corrigindo pontos e melhorando a experiência com base no feedback de vocês.</p>
      </section>

      <div className="aviso">
        <strong>O que cadastrar e desenvolver dentro do nosso projeto?</strong><br />
        Você pode acompanhar seu progresso, salvar conteúdos favoritos e participar de discussões. Basta criar uma conta gratuita.
      </div>

      <section className="secao">
        <h2>Por que catalogar e não cobrar?</h2>
        <p>Acreditamos que a informação é um direito, não um privilégio. Quanto mais pessoas acessam conhecimento, mais todos crescem. É uma troca onde todos ganham.</p>
      </section>

      <div className="metricas">
        <div className="metrica">
          <div className="metrica-valor">100%</div>
          <div className="metrica-label">Gratuito</div>
        </div>
        <div className="metrica">
          <div className="metrica-valor">0</div>
          <div className="metrica-label">Taxas ou assinaturas</div>
        </div>
      </div>

      <section className="secao">
        <h2>Conheça uma oportunidade gratuita e de qualidade!</h2>
        <p>Junte-se a nós e comece sua jornada de aprendizado hoje mesmo.</p>
      </section>

      <div className="botoes-acao">
        {!usuarioLogado && (
          <button className="btn btn-principal" onClick={handleInscrever}>
          Inscreva-se agora — é gratuito!
          </button>
        )}
        <a className="btn btn-secundario" href="https://github.com/MacesDSM/aprenda-mais" target="_blank" rel="noopener noreferrer">
          Consulte nosso código-fonte no GitHub
        </a>
      </div>
    </div>
    <Footer />
    </>
  );
}
