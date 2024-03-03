# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster
RUN apt-get install libxml2-dev libxslt-dev
# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
COPY ./app /app
COPY ./config /config
RUN ls -l /app
# Install any needed packages specified in requirements.txt
RUN pip3 install --upgrade pip
RUN pip3 install -r /config/requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80
# Run app.py when the container launches
CMD ["python3", "./app/app.py"]











