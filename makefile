# Lance l'API OCMovies : clone, installe et crée la base au premier lancement,
# puis démarre simplement le serveur les fois suivantes.
#
# Usage :
#   make          -> installe si besoin puis lance le serveur
#   make install  -> installe seulement (clone + venv + dépendances + base)
#   make clean    -> supprime le dossier de l'API

FOLDER_NAME := OCMovies-API-EN-FR
REPO_URL    := https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git

# Chemins du venv selon le système (Windows : env\Scripts, Linux/macOS : env/bin)
ifeq ($(OS),Windows_NT)
    PYTHON     := python
    VENV_PY    := env\Scripts\python.exe
    RM_FOLDER  := rmdir /s /q $(FOLDER_NAME)
else
    PYTHON     := python3
    VENV_PY    := env/bin/python
    RM_FOLDER  := rm -rf $(FOLDER_NAME)
endif

# Fichier créé par venv (sous Windows comme sous Linux) : sert de repère
VENV_STAMP := $(FOLDER_NAME)/env/pyvenv.cfg

.PHONY: all run install clean

all: run

# Lance le serveur (installe d'abord si la base n'existe pas encore)
run: $(FOLDER_NAME)/db.sqlite3
	cd $(FOLDER_NAME) && $(VENV_PY) manage.py runserver

install: $(FOLDER_NAME)/db.sqlite3

# 1. Clone du dépôt
$(FOLDER_NAME)/manage.py:
	git clone $(REPO_URL) $(FOLDER_NAME)

# 2. Création de l'environnement virtuel
$(VENV_STAMP): $(FOLDER_NAME)/manage.py
	cd $(FOLDER_NAME) && $(PYTHON) -m venv env

# 3. Dépendances + création de la base
#    (pas besoin d'activer le venv : on appelle directement son python)
$(FOLDER_NAME)/db.sqlite3: $(VENV_STAMP)
	cd $(FOLDER_NAME) && $(VENV_PY) -m pip install -r requirements.txt
	cd $(FOLDER_NAME) && $(VENV_PY) manage.py create_db

clean:
	$(RM_FOLDER)