import React from 'react';
import styles from '../Login.module.scss';

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => (
  <div className={styles.requirements}>
    <h3>Password Requirements:</h3>
    <ul>
      <li className={password?.length >= 6 ? styles.valid : ''}>
        Minimum 6 characters
      </li>
      <li className={password?.length <= 12 ? styles.valid : ''}>
        Maximum 12 characters
      </li>
      <li className={/[A-Z]/.test(password || '') ? styles.valid : ''}>
        One uppercase letter
      </li>
      <li className={/[a-z]/.test(password || '') ? styles.valid : ''}>
        One lowercase letter
      </li>
      <li className={/[0-9]/.test(password || '') ? styles.valid : ''}>
        One number
      </li>
      <li className={/[!@#$%^&*]/.test(password || '') ? styles.valid : ''}>
        One special character
      </li>
    </ul>
  </div>
);