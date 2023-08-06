FROM mongo

COPY seed.sh /seed.sh

RUN chmod +x /seed.sh

COPY seed-data /seed-data

ENTRYPOINT ["/seed.sh"]