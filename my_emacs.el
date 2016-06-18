;;; Emacs is not a package manager, and here we load its package manager!
(require 'package)
(dolist (source '(("marmalade" . "http://marmalade-repo.org/packages/")
                  ("elpa" . "http://tromey.com/elpa/")
                  ;; TODO: Maybe, use this after emacs24 is released
                  ;; (development versions of packages)
                  ("melpa" . "http://melpa.milkbox.net/packages/")
                  ))
  (add-to-list 'package-archives source t))
(package-initialize)

(load (expand-file-name "C:/my_programs/quicklisp/slime-helper.el"))
;; Replace "sbcl" with the path to your implementation
(setq inferior-lisp-program "sbcl")
(put 'upcase-region 'disabled nil)

;; JAVASCRIPT-MODE
;; js2-mode provides 4 level of syntax highlighting. They are * 0 or a negative value means none. * 1 adds basic syntax highlighting. * 2 adds highlighting of some Ecma built-in properties. * 3 adds highlighting of many Ecma built-in functions.
(setq js2-highlight-level 3)

(add-hook 'js2-mode-hook
    (lambda ()
        (local-set-key (kbd "C-j") 'ac-js2-jump-to-definition)
        (local-set-key (kbd "C-c C-n") 'js2-next-error)
        (define-key js2-mode-map (kbd "C-j") 'ac-js2-jump-to-definition)
        (linum-mode)
        (js2-reparse t)
        (ac-js2-mode)))

(add-to-list 'interpreter-mode-alist '("node" . js2-mode))
(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))
(add-to-list 'auto-mode-alist '("\\.json$" . js2-mode))
(require 'js2-refactor)
(js2r-add-keybindings-with-prefix "C-c C-m")
(add-hook 'js2-mode-hook #'js2-refactor-mode)
(add-hook 'js2-mode-hook 'ac-js2-setup-auto-complete-mode)

(add-to-list 'load-path "C:/my_programs/tern/emacs/")
(autoload 'tern-mode "tern.el" nil t)
(add-hook 'js2-mode-hook (lambda () (tern-mode t)))

(eval-after-load 'tern
   '(progn
      (require 'tern-auto-complete)
      (tern-ac-setup)))
	  
(global-auto-complete-mode t)
(require 'nginx-mode)

(add-to-list 'load-path "C:/my_programs/git/contrib/emacs")
  (require 'git)
  (require 'git-blame)

(add-to-list 'load-path (format "C:/my_programs/jdee-bin-2.4.1/jdee-2.4.1/lisp" my-jdee-path))
  (autoload 'jde-mode "jde" "JDE mode" t)
  (setq auto-mode-alist
        (append '(("\\.java\\'" . jde-mode)) auto-mode-alist))

;; load jde-maven
(require 'jde-maven2)

;;;;https://www.emacswiki.org/emacs/EmacsNewbieKeyReference#toc3