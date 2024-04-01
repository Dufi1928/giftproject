# Utiliser l'image PHP officielle comme image de base
FROM php:8.2-fpm

# Installer git, unzip, et les extensions nécessaires pour PHP
RUN apt-get update && apt-get install -y \
    unzip \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install \
    pdo pdo_pgsql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copier les fichiers de l'application Symfony dans le conteneur
COPY . /var/www

# Définir le répertoire de travail
WORKDIR /var/www

# Permettre l'exécution de Composer en tant que super utilisateur
ENV COMPOSER_ALLOW_SUPERUSER=1

# Installer les dépendances de l'application sans scripts
RUN composer install --no-interaction

# Exposer le port 9000
EXPOSE 9000

# Commande pour démarrer PHP-FPM
CMD ["php-fpm"]
