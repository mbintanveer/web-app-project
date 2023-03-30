FROM python:3.7

# RUN apt-get update && apt-get install -y pkg-config
ENV DB_HOST db
ENV DB_NAME mydbname
ENV DB_USER mydbuser
ENV DB_PASSWORD mydbpassword
ENV DB_PORT 3306

#
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        default-libmysqlclient-dev \
        gcc \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file into the container at /app/requirements.txt
COPY ./requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

COPY entrypoint.sh /entrypoint.sh

# RUN chmod +x app/entrypoint.sh

# ENTRYPOINT ["./entrypoint.sh"]

# Copy the current directory contents into the container at /app
COPY . /app/

EXPOSE 8000

# Run the command to start the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

