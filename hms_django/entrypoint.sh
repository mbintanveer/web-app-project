while ! nc -z db 3306; do
    echo "Waiting for MySQL database to be ready..."
    sleep 1
done
echo "MySQL database is ready!"

# Apply database migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver 0.0.0.0:8000