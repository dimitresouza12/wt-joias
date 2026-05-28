import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>
          © 2026 WT Joias. Todos os direitos reservados.
          <br />
          Desenvolvido por{" "}
          <a href="https://otimizai.net.br/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Otimiza Aí
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
