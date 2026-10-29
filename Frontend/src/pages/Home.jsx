import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="auth-hero1">
       

     
        <div className="auth-hero-content">

          <div className="auth-logo">
            <span>+</span>
            Aprender
          </div>

          <h1>
            Aprenda hoje.
            <br />
            Transforme seu amanhã.
          </h1>

          <p className="frase1">
            Uma plataforma educacional criada para
            tornar o aprendizado mais simples,
            acessível e conectado.
          </p>

          <div className="auth-benefits">
            <div>
              <span>✓</span>
              Conteúdos educacionais
            </div>

            <div>
              <span>✓</span>
              Atividades interativas
            </div>

            <div>
              <span>✓</span>
              Acompanhamento do progresso
            </div>
          </div>
          <div  >
               <nav>
      {/* O Link renderiza uma tag <a> mas é controlado pelo React */}
      <Link to="/login">
        <button className="auth-submit1"type="submit">Entrar</button>
      </Link>
      
              </nav>

       </div>

        </div>

    
      
    </div>
  );
}

export default Home;