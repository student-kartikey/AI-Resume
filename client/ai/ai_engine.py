import PyPDF2

def extract_text_from_pdf(file_path):
    text = ""

    with open(file_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)

        for page in reader.pages:
            text += page.extract_text() or ""

    return text

def analyze_resume(resume_text):
    resume_text = resume_text.lower()

    skills_db = ["python", "java", "machine learning", "html", "css", "javascript"]

    job_roles = {
        "web developer": ["html", "css", "javascript"],
        "data scientist": ["python", "machine learning"],
        "software developer": ["java", "python"]
    }

    matched = [skill for skill in skills_db if skill in resume_text]
    score = round((len(matched) / len(skills_db)) * 100,2)

    best_role = "None"
    best_score = 0

    for role, skills in job_roles.items():
        match_count = sum([1 for skill in skills if skill in resume_text])
        role_score = round((match_count / len(skills)) * 100,2)

        if role_score > best_score:
            best_score = role_score
            best_role = role

    return {
        "score": score,
        "matched_skills": matched,
        "best_role": best_role,
        "role_score": best_score
    }

if __name__ == "__main__":
    import os
    file_path = os.path.join(os.path.dirname(__file__), "sample_resume.pdf") #put your file name here

    resume_text = extract_text_from_pdf(file_path)
    result = analyze_resume(resume_text)

    print(result)
