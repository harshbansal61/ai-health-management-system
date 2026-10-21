# Viva Questions & Answers – AI Medical Symptom Checker

---

## Section 1: Project Overview

**Q1. What is this project about?**
> MediCheck AI is a full-stack web application that uses a machine learning model (Random Forest Classifier) to predict possible diseases based on symptoms selected by the user. It includes user authentication, a prediction history, downloadable PDF reports, an admin panel, and a clean responsive UI — built as an MCA end-term project.

**Q2. What problem does this project solve?**
> Many people either ignore early symptoms or unnecessarily panic due to lack of accessible health information. This project provides a quick, AI-based preliminary check so users can make informed decisions about whether to seek medical attention. It is educational in nature and not a replacement for a doctor.

**Q3. Why is this project important?**
> It demonstrates the real-world application of machine learning in the healthcare domain, while also showcasing a complete full-stack development cycle — from database design to REST APIs to a modern frontend — making it relevant for both academic and industry purposes.

**Q4. Can this replace a real doctor?**
> Absolutely not. It is clearly stated throughout the application that this is for educational purposes only. A doctor performs physical examinations, lab tests, and uses clinical judgment — none of which an AI system like this can replicate. The app always shows a medical disclaimer.

**Q5. Who are the users of this system?**
> Two types: (1) Regular Users — who register, select symptoms, get predictions, view history and download reports. (2) Admin — who can manage symptoms, diseases, and view all user predictions through the admin panel.

---

## Section 2: Machine Learning

**Q6. Which ML algorithm did you use and why?**
> We used a **Random Forest Classifier**. It was chosen because:
> - It handles high-dimensional binary input (symptom vectors) very well
> - It is an ensemble of multiple decision trees, reducing overfitting
> - It provides `predict_proba()` — probabilities for each class — enabling confidence scores
> - It is fast, interpretable, and performs well on tabular classification tasks

**Q7. What is a Decision Tree?**
> A Decision Tree is a flowchart-like model where each internal node represents a feature test (e.g., "has fever?"), each branch represents an outcome, and each leaf represents a class label. It splits data based on features that maximize information gain or minimize impurity (Gini index).

**Q8. What is a Random Forest?**
> Random Forest is an ensemble learning method that creates N decision trees during training, each trained on a random subset of data and features. For classification, it takes the majority vote (or averaged probabilities) of all trees. This reduces variance and overfitting compared to a single tree.

**Q9. What is the difference between classification and regression?**
> Classification predicts a discrete label (e.g., disease name), while regression predicts a continuous value (e.g., temperature). Our problem is classification since we predict which disease class a symptom set belongs to.

**Q10. What is symptom prediction / disease classification?**
> Given a set of binary symptom features (present=1, absent=0), the model maps this input vector to one of 41 disease classes. This is a multi-class classification problem.

**Q11. What is train-test split?**
> We divide the dataset into two parts: training data (80%) used to fit the model, and test data (20%) used to evaluate performance on unseen data. This prevents overfitting and gives a realistic measure of model accuracy.

**Q12. What is accuracy?**
> Accuracy = (Correct Predictions) / (Total Predictions) × 100%. For example, if the model correctly predicts 95 out of 100 test cases, accuracy = 95%.

**Q13. What is a confidence score in this project?**
> After prediction, `predict_proba()` returns a probability for each disease. The highest probability × 100 is shown as the confidence score. E.g., if Random Forest gives 78% probability for "Migraine", the confidence is 78%.

**Q14. What is dataset preprocessing?**
> The raw CSV has diseases with up to 17 symptom columns. Preprocessing involves:
> 1. Melting the wide format to long format
> 2. Creating a binary pivot table (1 if symptom present, 0 otherwise)
> 3. Encoding disease names with LabelEncoder
> 4. Splitting into train/test sets

**Q15. What is LabelEncoder?**
> LabelEncoder converts categorical string labels (disease names) into integer codes. E.g., "Malaria" → 15, "Diabetes" → 7. During prediction, `inverse_transform()` converts the integer back to the disease name.

**Q16. How is the model saved and loaded?**
> Using `joblib.dump()` to serialize the trained model to a `.pkl` file. At runtime, `joblib.load()` deserializes it into memory. Three files are saved: `trained_model.pkl`, `label_encoder.pkl`, and `symptoms_list.pkl`.

**Q17. What is overfitting?**
> When a model performs very well on training data but poorly on test data, it has "memorized" the training set rather than learning generalizable patterns. Random Forest reduces this via bagging (bootstrap aggregation) and feature randomness.

**Q18. Why use joblib instead of pickle?**
> Joblib is more efficient for large numpy arrays (which scikit-learn models contain) because it uses memory-mapped files and better compression. Both work, but joblib is the recommended way for scikit-learn objects.

---

## Section 3: Backend

**Q19. What is an API?**
> API (Application Programming Interface) is a set of rules that allows two software systems to communicate. Our backend exposes a REST API that the frontend calls to get data, authenticate users, and make predictions.

**Q20. What is a REST API?**
> REST (Representational State Transfer) is an architectural style for APIs that uses standard HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove). Each endpoint represents a resource (e.g., `/api/predict`, `/api/history`).

**Q21. Why did you choose Flask?**
> Flask is lightweight, beginner-friendly, and easy to understand. It doesn't impose a rigid structure, making it ideal for academic projects. For production, FastAPI would be better (it's async and auto-generates docs), but Flask is easier to teach.

**Q22. What is JWT?**
> JSON Web Token (JWT) is a compact, URL-safe token used for authentication. After login, the server issues a JWT signed with a secret key. The client sends this token in the `Authorization: Bearer <token>` header with every protected request. The server verifies the signature to authenticate the user.

**Q23. What is password hashing? Why not store plain text?**
> Storing plain passwords is dangerous — if the database is hacked, all passwords are exposed. We use `werkzeug.security.generate_password_hash()` with bcrypt, which is a one-way function. Even the developer cannot reverse it to get the original password.

**Q24. What is CORS?**
> Cross-Origin Resource Sharing (CORS) is a browser security feature that blocks requests from a different origin (domain/port). Since our frontend (port 3000) calls our backend (port 5000), we must enable CORS on the backend using `Flask-CORS`. Without it, the browser rejects the API calls.

**Q25. What is SQLAlchemy?**
> SQLAlchemy is a Python ORM (Object Relational Mapper). It lets us define database tables as Python classes and write database operations in Python instead of raw SQL. For example, `User.query.filter_by(email=email).first()` instead of `SELECT * FROM users WHERE email = ?`.

**Q26. How does the ML model connect to the backend?**
> The Flask backend imports the `predictor.py` module which loads the `.pkl` model files on first use. When `POST /api/predict` is called, it passes the symptom list to `predictor.predict()`, which builds the binary input vector, calls `model.predict_proba()`, and returns the result dict.

---

## Section 4: Frontend

**Q27. What is React.js?**
> React is a JavaScript library for building user interfaces using reusable components. It uses a virtual DOM to efficiently update the UI when data changes, making it fast and reactive.

**Q28. What is Tailwind CSS?**
> Tailwind is a utility-first CSS framework that provides low-level utility classes (like `bg-blue-500`, `flex`, `rounded-xl`) directly in HTML/JSX, enabling rapid UI development without writing custom CSS.

**Q29. What is React Router?**
> React Router is a library for client-side routing in React apps. It renders different components for different URL paths without full page reloads — giving a Single Page Application (SPA) experience.

**Q30. What is Context API?**
> React's Context API provides a way to share data (like the logged-in user) across all components without prop drilling. We use `AuthContext` to store user state and expose `login`, `logout`, and `register` functions globally.

**Q31. What is Axios?**
> Axios is a JavaScript HTTP client for making API requests. It supports interceptors (to auto-attach JWT tokens), handles JSON automatically, and has better error handling than the native `fetch` API.

---

## Section 5: Database

**Q32. What is SQLite? When would you use MySQL or PostgreSQL?**
> SQLite is a file-based database — no separate server needed, ideal for development and small projects. MySQL/PostgreSQL are client-server databases suited for production with multiple concurrent users, larger datasets, and better performance. You'd switch by changing `DATABASE_URL` in `.env`.

**Q33. What is a foreign key?**
> A foreign key is a column in one table that references the primary key of another table, establishing a relationship. For example, `predictions.user_id` references `users.id`, ensuring every prediction belongs to a valid user.

**Q34. What is database normalization?**
> The process of organizing a database to reduce data redundancy. E.g., instead of storing user details in every prediction row, we store `user_id` and look up user details from the Users table when needed.

**Q35. Why store selected_symptoms as a JSON string in the database?**
> Because the number of symptoms per prediction varies (1 to 17+), a JSON array string is simpler than a many-to-many join table. It's a pragmatic trade-off for an educational project, though a junction table would be more normalized.

---

## Section 6: Deployment

**Q36. How would you deploy the frontend?**
> Build the React app with `npm run build`, then deploy the `build/` folder to Vercel or Netlify. Both support automatic deployments from GitHub. Set `REACT_APP_API_URL` to the production backend URL.

**Q37. How would you deploy the backend?**
> Deploy the Flask app to Render or Railway. These platforms detect Python apps, install requirements from `requirements.txt`, and run `gunicorn app:app`. Set all environment variables in the platform dashboard.

**Q38. How do you switch from SQLite to PostgreSQL?**
> Change `DATABASE_URL` in `.env` to `postgresql://user:password@host:5432/dbname`. SQLAlchemy abstracts the database — no code changes needed. On Render/Railway, a managed PostgreSQL addon generates this URL automatically.

**Q39. What are environment variables and why are they important?**
> Environment variables store configuration that changes between environments (dev/prod) and sensitive data (secret keys, DB passwords). They are kept out of source code (via `.gitignore`) to prevent exposure in version control.

**Q40. What is gunicorn?**
> Gunicorn is a production-grade WSGI HTTP server for Python web apps. Flask's built-in development server is single-threaded and not suitable for production. Gunicorn handles multiple concurrent requests with worker processes.

---

## Section 7: Security & Architecture

**Q41. What security measures did you implement?**
> 1. Password hashing with bcrypt (Werkzeug)
> 2. JWT authentication for all protected routes
> 3. Role-based access control (admin vs user)
> 4. CORS restricted to specific frontend origin
> 5. Input validation on all API endpoints
> 6. Admin-only endpoints protected by `admin_required` decorator

**Q42. What is role-based access control (RBAC)?**
> RBAC restricts system access based on user roles. In our app, users can only access their own data, while admins can access all data and manage the system. The `admin_required` decorator checks the user's role from JWT before allowing access.

**Q43. Explain the complete project flow.**
> 1. User registers → password hashed → JWT issued
> 2. User logs in → JWT verified → dashboard shown
> 3. User selects symptoms → POST /predict called
> 4. Backend passes symptoms to ML model → Random Forest predicts disease + confidence
> 5. Backend fetches disease metadata from DB → enriches response
> 6. Prediction saved to DB → result returned to frontend
> 7. User views result, downloads PDF or checks history

**Q44. What is the system architecture?**
> Three-tier architecture:
> - **Presentation Layer:** React.js frontend (Tailwind CSS, React Router)
> - **Application Layer:** Flask REST API (JWT auth, ML integration)
> - **Data Layer:** SQLite database (SQLAlchemy ORM) + .pkl model files

---

## Section 8: Limitations & Future Scope

**Q45. What are the limitations of this project?**
> 1. Small dataset (41 diseases) — real medical AI uses millions of records
> 2. Symptom-only input — ignores age, gender, medical history, lab results
> 3. No real-time updates to the ML model
> 4. SQLite not suitable for high-concurrency production use
> 5. No telemedicine integration
> 6. UI disclaimer is often ignored by users

**Q46. How can this project be improved?**
> 1. Larger, more diverse medical dataset
> 2. Deep learning model (CNN/LSTM on clinical notes)
> 3. Integration with real APIs (WebMD, Mayo Clinic)
> 4. Multi-language support
> 5. Doctor consultation booking
> 6. Wearable device data integration (heart rate, temperature)
> 7. Mobile app (React Native)
> 8. Real-time chat with a healthcare bot

**Q47. What is precision and recall in ML?**
> - **Precision:** Of all predicted positives, how many are actually positive = TP/(TP+FP)
> - **Recall:** Of all actual positives, how many did we correctly predict = TP/(TP+FN)
> High precision = few false positives. High recall = few false negatives. In medical diagnosis, high recall is critical to avoid missing diseases.

**Q48. What is the F1 score?**
> F1 = 2 × (Precision × Recall) / (Precision + Recall). It's the harmonic mean of precision and recall, useful when classes are imbalanced.

**Q49. What is feature importance in Random Forest?**
> Random Forest can calculate which symptoms (features) were most useful for making predictions, based on how much each feature reduces impurity across all trees. This can help identify the most diagnostically significant symptoms.

**Q50. How does the PDF report generation work?**
> We use the `ReportLab` Python library to programmatically create a PDF. The `generate_pdf_report()` function builds a document with patient info, prediction results, disease description, precautions, and alternative predictions — all formatted with tables, colors, and styled paragraphs — then returns it as bytes for the HTTP download response.

**Q51. What is the difference between supervised and unsupervised learning?**
> - **Supervised:** Model learns from labeled data (input → known output). Our project uses supervised learning — symptoms as input, disease name as the known label.
> - **Unsupervised:** Model finds patterns without labels (e.g., clustering patient data by similarity).

**Q52. Why did you use React over plain HTML/JS?**
> React's component-based architecture makes complex UIs (like the symptom checker with 130+ checkboxes, real-time filtering, and state management) manageable, reusable, and maintainable. Plain HTML/JS would require manual DOM manipulation and become difficult to maintain at scale.
