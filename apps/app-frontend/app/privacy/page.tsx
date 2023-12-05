import styles from "../../styles/About.module.scss";

const Privacy = () => {
  return (
    <main className={styles.main} role="main">
      <h1 className={styles.title} role="heading">
        Privacy Policy
      </h1>
      <p className={styles.text}>
        This is the Privacy Policy of the of the One Day One Plant web site, its
        related websites, and its and their successor web sites (collectively
        referred to as the “Site”), which are owned and operated by Gauthier
        Cassany. (which may be referred to in the Terms as “we”, “us”, One Day
        One Plant). It describes the information that we collect from users of
        our Site (“Users”) as part of the normal operation of our Site, and how
        we use and disclose this information. By accepting the Privacy Policy in
        registration or by visiting and using the Site, you expressly consent to
        our collection, use and disclosure of your information in accordance
        with this Privacy Policy. If you have additional questions or require
        more information about our Privacy Policy, do not hesitate to contact
        us.
      </p>
      <h2 className={styles.subtitle} role="heading">
        What Information Do We Collect?
      </h2>
      <p className={styles.text}>
        We may collect Personal Information when you create an account or
        communicate with us. If you create a One Day One Plant profile, we may
        collect your username, password, email address, the date you created
        your account, your score. We do not collect any Sensitive Data about
        you.
      </p>
      <h2 className={styles.subtitle} role="heading">
        How do we use your information?
      </h2>
      <p className={styles.text}>
        We use information we maintain about you to multiples purposes.
      </p>
      <ul>
        <li>To provide and administer access to the Service</li>
        <li>To respond to your inquiries, comments, feedback, or questions</li>
        <li>
          To send administrative information to you, for example, information
          regarding the Service and changes to our terms, conditions, and
          policies
        </li>
        <li>
          To maintain and improve the content and functionality of the Service
        </li>
      </ul>
      <h2 className={styles.subtitle} role="heading">
        Who has access to my personal data?
      </h2>
      <p className={styles.text}>
        Your personal information is contained behind secured networks and is
        only accessible by a limited number of persons who have special access
        rights to such systems. The information displayed on your profil are
        accessible by all One Day One Plant users.
      </p>
      <h2 className={styles.subtitle} role="heading">
        Cookies
      </h2>
      <p className={styles.text}>
        “Cookies” are small files placed on your hard drive that assist us in
        providing our services. We use cookies to allow you to enter your
        password less frequently during a session, and we use data collection
        devices (such as Google Analytics), including cookies, on certain pages
        of the Site to help analyze our web page flow and measure promotional
        effectiveness.
      </p>
      <h2 className={styles.subtitle} role="heading">
        Data Retention
      </h2>
      <p className={styles.text}>
        When you delete personal data from One Day One Plant, we immediately
        delete it from our servers. Emergency backups of our database are done
        every day, and we delete each of these backups after a few days. So
        within a few days, your personal data won&apos;t even exist in our
        backups.
      </p>
      <h2 className={styles.subtitle} role="heading">
        Security
      </h2>
      <p className={styles.text}>
        We have put in place security measures to prevent your personal data
        from being accidentally lost, used, altered, disclosed, or accessed
        without authorization. Your personal information is contained behind
        secured networks and is only accessible by a limited number of persons
        who have special access rights to such systems.
      </p>
      <h2 className={styles.subtitle} role="heading">
        Third-Party links
      </h2>
      <p className={styles.text}>
        This website may include links to third-party websites, plug-ins, and
        applications. Clicking on those links or enabling those connections may
        allow third parties to collect or share data about you. We do not
        control these third-party websites and are not responsible for their
        privacy statements. When you leave our website, we encourage you to read
        the privacy notice of every website you visit.
      </p>
      <h2 className={styles.subtitle} role="heading">
        Other organizations
      </h2>
      <p className={styles.text}>
        For your convenience, we give you the option to sign in using Google, if
        you don&apos;t want to use your email address to sign in. If you choose
        to use one of these sign in options, some of your One Day One Plant data
        will be shared with Google.
      </p>
    </main>
  );
};

export default Privacy;
