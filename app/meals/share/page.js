'use client';
import classes from './page.module.css';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ShareMealPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Submitting...');

    try {
      let imageUrl = '';
      
      if (imageFile) {
        const signatureRes = await fetch('/api/sign-cloudinary', { method: 'POST' });
        const { signature, timestamp, apiKey, cloudName, folder } = await signatureRes.json();
      
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);
        formData.append('folder', folder);
      
        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: formData }
        );
      
        const cloudData = await cloudRes.json();
        if (!cloudData.secure_url) {
          toast.dismiss(loadingToast);
          toast.error('Image upload failed ❌');
          return;
        }
        imageUrl = cloudData.secure_url;
      }
      
      const result = await fetch('http://localhost:3000/api/sharedMeal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, title, email, summary, instructions, image: imageUrl }),
      });

      toast.dismiss(loadingToast);

      if (result.ok) {
        toast.success('✅ Meal shared successfully!');
        setTimeout(() => router.push('/meals'), 1000);
      } else {
        const data = await result.json();
        toast.error(data.error || '❌ Failed to share meal.');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('❌ Server error, please try again');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>

      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.gridContainer}>
            <div className={classes.formFields}>
              <div className={classes.row}>
                <p>
                  <label htmlFor="name">Your name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                  />
                </p>
                <p>
                  <label htmlFor="email">Your email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                  />
                </p>
              </div>

              <p>
                <label htmlFor="title">Title</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Delicious Meal Name"
                />
              </p>

              <p>
                <label htmlFor="summary">Short Summary</label>
                <input
                  onChange={(e) => setSummary(e.target.value)}
                  type="text"
                  id="summary"
                  name="summary"
                  required
                  placeholder="A brief description of your meal"
                />
              </p>

              <p>
                <label htmlFor="instructions">Instructions</label>
                <textarea
                  onChange={(e) => setInstructions(e.target.value)}
                  id="instructions"
                  name="instructions"
                  rows="8"
                  required
                  placeholder="Step-by-step instructions for preparing the meal..."
                ></textarea>
              </p>
            </div>

            <div className={classes.imageSection}>
              <div className={classes.uploadContainer}>
                <label htmlFor="image" className={classes.uploadLabel}>
                  <div className={classes.uploadContent}>
                    <svg className={classes.uploadIcon} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,10V12H8V14H10V16H12V14H14V12H12V10H10Z" />
                    </svg>
                    <p className={classes.uploadText}>Click to upload meal image</p>
                    <p className={classes.uploadHint}>Recommended size: 800x600px</p>
                  </div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                    className={classes.fileInput}
                  />
                </label>
              </div>

              {imageFile && (
                <div className={classes.previewContainer}>
                  <div className={classes.previewContent}>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Selected meal"
                      className={classes.previewImage}
                    />
                    <div className={classes.previewInfo}>
                      <p className={classes.filename}>{imageFile.name}</p>
                      <p className={classes.fileSize}>
                        {(imageFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className={classes.actions}>
            <button type="submit">
              <span>🍽️ Share Meal</span>
            </button>
          </p>
        </form>
      </main>
    </>
  );
}