import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail } from 'lucide-react';
import { loginSchema, LoginFormData } from '../schema';
import { PasswordRequirements } from './PasswordRequirements';
import styles from '../Login.module.scss';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          <Mail className={styles.icon} />
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={styles.input}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          <Lock className={styles.icon} />
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className={styles.input}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          <Lock className={styles.icon} />
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          className={styles.input}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit" className={styles.button}>
        Sign In
      </button>

      <PasswordRequirements password={password} />
    </form>
  );
};