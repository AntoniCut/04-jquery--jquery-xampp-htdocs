# Boilerplate de plugin jQuery (Jonathan Nicol)

Fuente: [A jQuery plugin boilerplate](https://jonathannicol.com/blog/2012/05/06/a-jquery-plugin-boilerplate/)

El artículo de Jonathan Nicol no es un plugin con una función concreta (validar, sliders, etc.). Es un **molde**: una estructura reutilizable para escribir plugins de jQuery “de verdad”, con opciones, métodos públicos/privados, callbacks y destrucción de instancia.

El archivo `jquery.plugins.js` de esta carpeta es exactamente ese molde, ya adaptado a `advancedValidation`. Este documento explica el boilerplate original pieza por pieza y, al final, cómo encaja con ese plugin.

---

## Qué problema resuelve

Un plugin “simple” suele ser esto:

```javascript
$.fn.miPlugin = function (options) {
  return this.each(function () {
    // hacer algo
  });
};
```

Eso funciona para algo pequeño, pero se queda corto cuando quieres:

- guardar estado por cada elemento (`#form1` y `#form2` independientes)
- llamar métodos después (`$('#el').miPlugin('destroy')`)
- leer/cambiar opciones más tarde
- exponer solo algunos métodos y esconder el resto
- avisar al usuario con callbacks (`onInit`, `onDestroy`)
- no inicializar dos veces el mismo elemento

El boilerplate de Nicol resuelve todo eso con **tres piezas**:

1. Un constructor `Plugin` (una instancia por elemento).
2. Un enrutador en `$.fn[pluginName]` (decide si inicializas o llamas un método).
3. Un objeto `defaults` (opciones y hooks).

---

## El boilerplate original (sin comentarios)

```javascript
/**
 * A jQuery plugin boilerplate.
 * Author: Jonathan Nicol @f6design
 */
;(function($) {
  var pluginName = 'demoplugin';

  function Plugin(element, options) {
    var el = element;
    var $el = $(element);

    options = $.extend({}, $.fn[pluginName].defaults, options);

    function init() {
      // Add any initialization logic here...

      hook('onInit');
    }

    function fooPublic() {
      // Code goes here...
    }

    function option (key, val) {
      if (val) {
        options[key] = val;
      } else {
        return options[key];
      }
    }

    function destroy() {
      $el.each(function() {
        var el = this;
        var $el = $(this);

        // Add code to restore the element to its original state...

        hook('onDestroy');
        $el.removeData('plugin_' + pluginName);
      });
    }

    function hook(hookName) {
      if (options[hookName] !== undefined) {
        options[hookName].call(el);
      }
    }

    init();

    return {
      option: option,
      destroy: destroy,
      fooPublic: fooPublic
    };
  }

  $.fn[pluginName] = function(options) {
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      this.each(function() {
        if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
          returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
        }
      });
      if (returnVal !== undefined){
        return returnVal;
      } else {
        return this;
      }
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    }
  };

  $.fn[pluginName].defaults = {
    onInit: function() {},
    onDestroy: function() {}
  };

})(jQuery);
```

---

## 1. El envoltorio IIFE

```javascript
;(function ($) {
  // todo el plugin
})(jQuery);
```

Tres detalles importantes:

**El `;` inicial.**
Si alguien concatena varios JS y el archivo anterior no termina en `;`, esto evita que se peguen dos sentencias y se rompa el parseo. Es una defensa defensiva clásica.

**La función anónima inmediata.**
Crea un ámbito privado. Lo que declares dentro (`pluginName`, `Plugin`) no contamina `window`.

**El parámetro `$`.**
Recibe `jQuery` como argumento. Dentro puedes usar `$` con seguridad aunque en la página exista `jQuery.noConflict()` y `$` no sea jQuery.

---

## 2. El nombre del plugin

```javascript
var pluginName = 'demoplugin';
```

No hardcodean `'demoplugin'` en 20 sitios. Lo usan para:

- registrar el método: `$.fn.demoplugin`
- guardar la instancia: `$.data(el, 'plugin_demoplugin')`
- mensajes de error: `jQuery.demoplugin`

En `jquery.plugins.js` eso ya es `'advancedValidation'`, por eso puedes escribir `$('form').advancedValidation(...)`.

---

## 3. El constructor `Plugin` (Revealing Module Pattern)

```javascript
function Plugin(element, options) {
  var el = element;
  var $el = $(element);
  options = $.extend({}, $.fn[pluginName].defaults, options);

  function init() { /* ... */ }
  function fooPublic() { /* ... */ }
  function option(key, val) { /* ... */ }
  function destroy() { /* ... */ }
  function hook(hookName) { /* ... */ }

  init();

  return {
    option: option,
    destroy: destroy,
    fooPublic: fooPublic
  };
}
```

Esto **no** es una clase clásica. Es el patrón **Revealing Module**:

- Cada llamada a `new Plugin(...)` crea un closure nuevo.
- `el`, `$el` y `options` viven dentro de esa instancia y no se ven desde fuera.
- Solo se “revelan” las funciones del `return`.

Por eso hay métodos **públicos** (`option`, `destroy`, `fooPublic`) y **privados** (`init`, `hook`). El usuario no puede hacer `$('#el').demoplugin('hook')` porque `hook` no está en el objeto devuelto.

### `el` y `$el`

- `el`: el nodo DOM crudo (`<form>`, `<div>`, etc.).
- `$el`: el mismo nodo envuelto en jQuery.

Los callbacks se disparan con `this === el` (el DOM), no con el objeto jQuery. Por eso en el artículo el ejemplo es `$(this).hide()`.

### `$.extend({}, defaults, options)`

```javascript
options = $.extend({}, $.fn[pluginName].defaults, options);
```

Crea un objeto **nuevo** `{}`, copia primero los defaults y luego pisa con lo que pasó el usuario.

El `{}` inicial es importante: sin él, `$.extend` mutaría `$.fn[pluginName].defaults` y las opciones de una instancia ensuciarían las de las demás.

Flujo:

```text
defaults:  { color: 'red',  height: 200, onInit: fn }
usuario:   { color: 'blue' }
resultado: { color: 'blue', height: 200, onInit: fn }
```

---

## 4. `init()`: el arranque de la instancia

```javascript
function init() {
  // Add any initialization logic here...
  hook('onInit');
}
```

Aquí va lo que el plugin “hace” al nacer: eventos, clases, markup extra, lecturas del DOM.

Al final dispara `onInit` para que el usuario pueda engancharse.

En `jquery.plugins.js`, eso ya está rellenado:

```javascript
$el.on('submit', function (ev) {
  validate().fail(function () {
    ev.preventDefault();
  });
});

hook('onInit');
```

El molde solo deja el hueco. La lógica de negocio (validar al submit) es tuya.

`init()` se llama **al final del constructor**, justo antes del `return`. En cuanto haces `new Plugin(...)`, el plugin ya está vivo.

---

## 5. Métodos públicos vs privados

```javascript
function fooPublic() {
  // visible desde fuera
}

function fooPrivate() {
  // solo usable dentro de Plugin
}

return {
  fooPublic: fooPublic
};
```

Uso externo:

```javascript
$('#element').demoplugin('fooPublic', 'val1', 'val2');
```

Eso **no** llama a `fooPublic` directamente. Pasa por el enrutador de `$.fn` (más abajo), que busca la instancia guardada en `$.data` y ejecuta ese método.

En `jquery.plugins.js`, los públicos son `option`, `destroy`, `isValid` y `validate`. `_validation` es privado: el usuario no puede llamarlo.

---

## 6. `option`: getter y setter

```javascript
function option(key, val) {
  if (val) {
    options[key] = val;
  } else {
    return options[key];
  }
}
```

Dos modos:

```javascript
$('#el').demoplugin('option', 'color');           // get → '#ff0000'
$('#el').demoplugin('option', 'color', '#00ff00'); // set
```

Matiz: `if (val)` trata como “no hay valor” a `0`, `false` o `''`. Si quisieras guardar `false`, este setter fallaría. Es una limitación del boilerplate original.

Otro matiz: cambiar una opción **no reaplica** el plugin. Solo cambia el dato en memoria. Si `color` ya se pintó en `init()`, hace falta lógica extra para que el cambio se vea.

---

## 7. `destroy`: apagar la instancia

```javascript
function destroy() {
  $el.each(function() {
    var el = this;
    var $el = $(this);

    // restaurar el DOM a su estado original...

    hook('onDestroy');
    $el.removeData('plugin_' + pluginName);
  });
}
```

Uso:

```javascript
$('#element').demoplugin('destroy');
```

El boilerplate **solo** borra la instancia de `$.data`. Tú debes añadir:

- quitar listeners (`$el.off(...)`)
- quitar clases/markup que el plugin haya creado
- restaurar atributos

Si no lo haces, el elemento queda “sucio” aunque ya no haya instancia.

Tras `removeData`, una nueva llamada `$('#el').demoplugin()` puede crear otra instancia limpia, porque el chequeo `if (!$.data(...))` vuelve a ser verdadero.

---

## 8. `hook`: el sistema de callbacks

```javascript
function hook(hookName) {
  if (options[hookName] !== undefined) {
    options[hookName].call(el);
  }
}
```

Los hooks **no son eventos de jQuery**. Son funciones guardadas en `options`.

1. En `defaults` dejas un hueco vacío:

```javascript
onInit: function () {}
```

2. El usuario lo sobreescribe al inicializar:

```javascript
$('#element').demoplugin({
  onSlideshowFinished: function () {
    $(this).hide(); // this === el (el DOM)
  }
});
```

3. Dentro del plugin disparas:

```javascript
hook('onSlideshowFinished');
```

`.call(el)` fija `this` al elemento DOM.

En los comentarios del artículo, Nicol y otros lectores mejoran esto para pasar datos:

```javascript
function hook(hookName, args) {
  if (options[hookName] !== undefined) {
    options[hookName].apply(el, args);
  }
}

hook('myhook', [param1, param2]);
```

`advancedValidation` usa exactamente este mecanismo: `onIsValid`, `onIsNotValid`, `onValidating`, `onValidated`. Ojo: esos nombres **no existen en `defaults`** de `jquery.plugins.js` (solo tienes `onInit` y `onDestroy`). Funcionan porque el usuario los pasa en `scripts.js` y `$.extend` los mete en `options`. Si no los pasas, `hook('onIsValid')` no hace nada porque `options.onIsValid` es `undefined`.

---

## 9. El corazón: `$.fn[pluginName]`

Esta es la función que el usuario llama. Hace de **dispatcher**: o crea instancias, o ejecuta un método público.

```javascript
$.fn[pluginName] = function (options) {
  if (typeof arguments[0] === 'string') {
    // CAMINO A: método público
  } else if (typeof options === "object" || !options) {
    // CAMINO B: inicialización
  }
};
```

### Camino B — Inicializar

```javascript
$('#element').demoplugin();
$('#element').demoplugin({ color: '#0000ff' });
```

`options` es un objeto, o no se pasó (`undefined`, y `!options` es true).

```javascript
return this.each(function () {
  if (!$.data(this, 'plugin_' + pluginName)) {
    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
  }
});
```

Qué ocurre, en orden:

1. `this` es la colección jQuery (`$('#element')` o `$('form')`).
2. `.each` crea **una instancia por elemento**. Dos formularios = dos `Plugin` independientes.
3. `$.data(this, 'plugin_demoplugin')` pregunta: ¿este nodo ya tiene plugin?
4. Si no, `new Plugin(this, options)` y se guarda en el elemento.

Eso da **singleton por elemento**: llamar otra vez `$('#el').demoplugin({ color: 'green' })` **no** reinicializa ni actualiza opciones. Se ignora. Para cambiar opciones hay que usar `'option'`.

`return this.each(...)` mantiene el encadenamiento: `$('#el').demoplugin().addClass('x')`.

### Camino A — Llamar un método

```javascript
$('#element').demoplugin('destroy');
$('#element').demoplugin('fooPublic', 'arg1', 'arg2');
$('#element').demoplugin('option', 'color');
```

```javascript
var methodName = arguments[0];                       // 'option'
var args = Array.prototype.slice.call(arguments, 1); // ['color'] o ['color', '#00ff00']
var returnVal;

this.each(function () {
  if ($.data(this, 'plugin_' + pluginName) &&
      typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
  } else {
    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
  }
});

if (returnVal !== undefined) {
  return returnVal;
} else {
  return this;
}
```

Paso a paso:

1. El primer argumento es string → no es inicialización, es un comando.
2. `slice(arguments, 1)` separa el nombre de los parámetros reales.
   `$('#el').demoplugin('option', 'color', '#0f0')` → método `'option'`, args `['color', '#0f0']`.
3. Recorre cada elemento de la colección.
4. Recupera la instancia: `$.data(this, 'plugin_demoplugin')`.
5. Comprueba que esa clave exista **y** que sea una función.
6. La ejecuta con `.apply(this, args)`.
   Ojo: `this` aquí es el **DOM**, no la instancia. Dentro de `option`/`destroy` no usas `this` para el estado; usas el closure (`options`, `$el`).
7. Si el método **devuelve algo** (`option` en modo get, `isValid`), ese valor sale hacia fuera y **se rompe el encadenamiento**.
8. Si no devuelve nada (`destroy`, `fooPublic`), se devuelve `this` (la colección jQuery) para poder encadenar.

Si llamas un método inexistente, o el plugin no está inicializado, lanza error. Es deliberadamente estricto.

Ejemplo de get que rompe la cadena a propósito:

```javascript
var color = $('#el').demoplugin('option', 'color');
// color === '#ff0000'  (un string, ya no es jQuery)
```

---

## 10. `defaults`

```javascript
$.fn[pluginName].defaults = {
  onInit: function () {},
  onDestroy: function () {}
};
```

Cuelga de la función del plugin, no de cada instancia. Así:

- todas las instancias parten de lo mismo
- puedes cambiar defaults **globales** antes de inicializar:

```javascript
$.fn.demoplugin.defaults.color = '#0000ff';
$('.caja').demoplugin(); // todas nacen azules
```

Los dos hooks de fábrica son `onInit` y `onDestroy`. El resto los añades tú.

---

## 11. Cómo lo usa el consumidor

```javascript
// defaults
$('#element').demoplugin();

// con opciones y callbacks
$('#element').demoplugin({
  option1: 2000,
  callback1: function () { /* ... */ }
});

// método sin args
$('#element').demoplugin('publicFunctionName');

// método con args
$('#element').demoplugin('publicFunctionName', 'arg1', 'arg2');

// get / set de opción
$('#element').demoplugin('option', 'key');
$('#element').demoplugin('option', 'key', value);

// destruir
$('#element').demoplugin('destroy');
```

Eso es exactamente lo que hace `scripts.js`:

```javascript
$('form').advancedValidation({
  onIsValid: function () { console.log('Is Valid'); },
  onIsNotValid: function () { console.log('Is Not Valid'); }
});

$('form').advancedValidation('validate');
```

Primera llamada = Camino B (crea instancia).
Segunda = Camino A (ejecuta el público `validate`).

---

## 12. Mapa mental del ciclo de vida

```text
$('form').advancedValidation({ onIsValid: fn })
        │
        ▼
$.fn.advancedValidation ve un objeto
        │
        ▼
¿$.data(form, 'plugin_advancedValidation')?  → no
        │
        ▼
new Plugin(form, options)
        │
        ├─ el / $el
        ├─ options = defaults + usuario
        ├─ init()
        │     ├─ $el.on('submit', ...)
        │     └─ hook('onInit')
        └─ return { option, destroy, isValid, validate }
        │
        ▼
$.data(form, 'plugin_advancedValidation', instancia)


$('form').advancedValidation('validate')
        │
        ▼
$.fn.advancedValidation ve un string
        │
        ▼
instancia = $.data(form, 'plugin_advancedValidation')
instancia.validate()
        │
        ▼
_validation()  →  hooks onValidating / onIsValid / onIsNotValid / onValidated
```

---

## 13. Detalles finos (y trampas) del diseño

**Una instancia por elemento, no por colección.**
`$('form').advancedValidation()` sobre 3 forms crea 3 closures. Cada uno tiene su propio `options` y su propio `$el`.

**`$.data` es el almacén de estado.**
jQuery asocia un objeto de datos al nodo DOM. La clave `'plugin_' + pluginName` evita chocar con otros plugins o con tus propios `data-*`.

**`.apply(this, args)` no cambia el closure.**
Aunque `this` sea el DOM, `options` y `$el` siguen siendo los del constructor. El estado no viaja por `this`.

**Getters en colecciones de varios elementos.**
Si haces `$('form').advancedValidation('isValid')` con 2 forms, el `each` pisa `returnVal` y solo sobrevive el del **último**. Es una limitación conocida de este patrón.

**`destroy` recorre `$el.each`.**
En la práctica `$el` suele ser un solo elemento (el constructor recibe `this` de un `each`). El `each` interno es redundante, pero no rompe nada.

**No hay `fooPrivate` en el código mínimo.**
El artículo lo enseña como idea: cualquier función que no esté en el `return` es privada.

---

## 14. Cómo se relaciona con `jquery.plugins.js`

| Pieza del boilerplate | En `advancedValidation` |
|---|---|
| `pluginName = 'demoplugin'` | `'advancedValidation'` |
| `fooPublic` | `isValid`, `validate` |
| `init` vacío | listener `submit` + `validate()` |
| hooks de fábrica | sigue teniendo `onInit` / `onDestroy` |
| hooks extra | `onValidating`, `onIsValid`, `onIsNotValid`, `onValidated` (los usa, pero no están en `defaults`) |
| `_validation` | método privado real, no expuesto en el `return` |

El boilerplate te da el **chasis**. El curso le pone el **motor**: Deferreds, clases de error y validación de campos `.basic-validation`.
