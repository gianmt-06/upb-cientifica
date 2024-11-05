import { FaArrowCircleDown } from "react-icons/fa";
import "./landingpage.css";

const LandingPage = () => {
  return (
    <div className="main-page">
      <div className="text-container">
        <h1 className="main-page-title">UPB-Cientifica</h1>
        <p className="main-page-text">
          En UPB-CIENTÍFICA, transformamos tus ideas en grandes avances
          científicos. Como microempresa respaldada por la Universidad
          Pontificia Bolivariana Seccional Bucaramanga, ofrecemos soluciones de
          Computación de Alto Rendimiento (HPC) para la comunidad científica y
          tecnológica. Nuestro enfoque se basa en proporcionar acceso a recursos
          computacionales de última generación, optimizados para la ejecución de
          código en paralelo y el análisis de datos a gran escala.
        </p>
        <div className="buttons-container"></div>


        <div class="reflector">
          <div class="light"></div>
        </div>
        <a href="" className={"know-button"}>
          <FaArrowCircleDown />
          <span>Saber más</span>
        </a>
      </div>

      <div className="cards-container">
        <div class="card-item">
          <div class="card__content"></div>
        </div>
        <div class="card-item">
          <div class="card__content"></div>
        </div>
        <div class="card-item">
          <div class="card__content"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
