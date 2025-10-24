import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, isAuthed } from "../../utils/auth";
import "./auth.css";
import Header from "../../components/Header";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (isAuthed()) nav("/dashboard", { replace: true });

  function onChange(ev) {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  }

  function validate() {
    const error = {};
    if (!form.email.trim()) error.email = "Email is required.";
    else if (!emailRe.test(form.email))
      error.email = "Enter a valid email (name@example.com).";

    if (!form.password) error.password = "Password is required.";
    else if (form.password.length < 6)
      error.password = "Use at least 6 characters.";

    if (!form.confirm) error.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password)
      error.confirm = "Passwords do not match.";
    return error;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      setToast("Please fix the errors before continuing.");
      setTimeout(() => setToast(""), 2200);
      return;
    }
    login(form.email);
    nav("/dashboard", { replace: true });
  }

  return (
    <section>
      <Header />
      <div className='auth-wrap'>
        <form
          className='auth-card'
          onSubmit={onSubmit}
          noValidate
          aria-labelledby='signup-title'
        >
          <h1 id='signup-title' className='auth-title'>
            Create your account
          </h1>

          <div className='auth-field'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={form.email}
              onChange={onChange}
              aria-describedby={errors.email ? "email-err" : undefined}
            />
            {errors.email && (
              <p id='email-err' className='error'>
                {errors.email}
              </p>
            )}
          </div>

          <div className='auth-field'>
            <label htmlFor='password'>Password</label>
            <div className='password-wrap'>
              <input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                autoComplete='new-password'
                required
                value={form.password}
                onChange={onChange}
                aria-describedby={errors.password ? "password-err" : undefined}
              />
              <button
                type='button'
                className='toggle-pass'
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "Hide" : "Show"}{" "}
              </button>
            </div>
            {errors.password && (
              <p id='password-err' className='error'>
                {errors.password}
              </p>
            )}
          </div>

          <div className='auth-field'>
            <label htmlFor='confirm'>Confirm Password</label>
            <div className='password-wrap'>
              <input
                id='confirm'
                name='confirm'
                type={showConfirm ? "text" : "password"}
                autoComplete='new-password'
                required
                value={form.confirm}
                onChange={onChange}
                aria-describedby={errors.confirm ? "confirm-err" : undefined}
              />
              <button
                type='button'
                className='toggle-pass'
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={showConfirm}
                onClick={() => setShowConfirm((s) => !s)}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirm && (
              <p id='confirm-err' className='error'>
                {errors.confirm}
              </p>
            )}
          </div>

          <div className='auth-actions'>
            <button
              className='btn btn-primary'
              type='submit'
              aria-label='Create account'
            >
              Sign Up
            </button>
            <Link
              className='btn btn-ghost'
              to='/auth/login'
              aria-label='Back to login'
            >
              Back to Login
            </Link>
          </div>
        </form>

        {toast && (
          <div className='toast' role='status' aria-live='polite'>
            {toast}
          </div>
        )}
      </div>
    </section>
  );
}
