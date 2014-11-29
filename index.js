var btn = document.querySelector('button');
var notify = document.querySelector('.notify');

singleDoubleClick(btn, function (e) {
  append(e, 'Click');
}, function (e) {
  append(e, 'Double Click');
});

function append (e, str) {
  var div = document.createElement('div');
  var t = new Date(e.timeStamp);
  var fadeInDuration = 300;

  div.classList.add(str === 'Click' ? 'click' : 'click--dbl');
  div.dataset.time = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
  div.textContent = str;

  notify.insertBefore(div, notify.firstChild);
  setTimeout(function () {
    div.classList.add('fade-in');
    remove(div);
  }, fadeInDuration);
}

function remove (el) {
  var totalDuration = 10000;
  var fadeOutDuration = 1000;

  setTimeout(function () {
    el.classList.add('fade-out');
    setTimeout(function () {
      notify.removeChild(el);
    }, fadeOutDuration);
  }, totalDuration - fadeOutDuration);
}

function singleDoubleClick (el, clickFn, doubleFn, timeout) {
  var clicks = 0;
  var self = this;
  el.addEventListener('click', function (e) {
    clicks++;
    setTimeout(function () {
      if (clicks === 1) {
        clickFn.call(self, e);
      }
      clicks = 0;
    }, timeout || 300);
  });

  el.addEventListener('dblclick', function (e) {
    doubleFn.call(self, e);
  });
}

