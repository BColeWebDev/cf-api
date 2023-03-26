

FROM nginx

RUN rm /etc/nginx/nginx.conf 


COPY ./www/*.html /usr/share/nginx/html/
#copy ./*.css /usr/share/nginx/html/
#copy ./*.png /usr/share/nginx/html/
#copy ./*.js /usr/share/nginx/html/

# config
COPY nginx.conf /etc/nginx/nginx.conf
