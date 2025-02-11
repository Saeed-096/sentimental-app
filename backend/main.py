import subprocess

scripts = [ "youtube.py","home.py"]  # Excluding whatsapp.py

# Start other scripts
# uvicorn amazon:app --reload --host 0.0.0.0 --port 8000
processes = [subprocess.Popen(["python3", f"{script}"]) for script in scripts]
whatsapp_process = subprocess.Popen(["uvicorn", "whatsapp:app", "--reload", "--host", "0.0.0.0", "--port", "4000"])
amazon_process = subprocess.Popen(["uvicorn", "amazon:app", "--reload", "--host", "0.0.0.0", "--port", "8000"])

# Wait for all processes to complete
for process in processes:
    process.wait()
    whatsapp_process.wait()
    amazon_process.wait()