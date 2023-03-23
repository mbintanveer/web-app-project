
FROM python:3.7-slim-buster

RUN apt-get update && apt-get install -y pkg-config

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file into the container at /app/requirements.txt
COPY ./requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV PYTHONPATH "/app"

EXPOSE 8000

# Run the command to start the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

