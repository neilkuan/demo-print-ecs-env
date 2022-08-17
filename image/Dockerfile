FROM public.ecr.aws/docker/library/python:3.7-alpine
WORKDIR /app
COPY . .
RUN pip3 install -r requirements.txt 
EXPOSE 5000
ENTRYPOINT [""]
CMD ["python", "app.py"]