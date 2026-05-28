import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        © 2026 WT Joias. Todos os direitos reservados.
      </p>
      <p className={styles.dev}>
        Desenvolvido por{" "}
        <a
          href="https://otimizai.net.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.devLink}
        >
          Otimiza Aí
        </a>
      </p>
    </footer>
  );
}
