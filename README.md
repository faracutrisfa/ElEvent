## Clone the Project

1. Open your terminal and navigate to the directory where you want to clone the project.
2. Execute the following command to clone the project from GitHub:

```shell
git clone git@github.com/faracutrisfa/ElEvent.git
```

## Project Configuration

1. Change your current directory to the project's root folder:

```shell
cd ElEvent
```

2. Install the required PHP dependencies using Composer:

```shell
composer install
```

3. Create a copy of the `.env.example` file and rename it to `.env`:

```shell
cp .env.example .env
```

4. Generate an application key:

```shell
php artisan key:generate
```

## Frontend Setup

1. Install the necessary JavaScript dependencies using NPM:

```shell
npm install
```

2. Build the frontend assets:

```shell
npm run dev
```

3. Hot reloading frontend assets

```shell
npm run hot
```

## Start the Application

Once you have completed the setup steps, you can start the Laravel application:

```shell
php artisan serve
```
****
This will start a development server, and you can access your application by visiting `http://127.0.0.1:8000` in your web browser.

## Contact Information

If you have any questions or concerns regarding this project or the instruction provided in this repository, please do not hesitate to contact one or many of the Maintainer of this project 🙂.

Happy coding!