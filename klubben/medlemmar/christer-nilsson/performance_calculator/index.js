// Generated by CoffeeScript 2.7.0
var ass, calculate, expected_score, extrapolate, performance, performance_rating, summa;

ass = function(a, b) {
  if (a !== b) {
    console.log('assert failure');
    console.log(a);
    return console.log(b);
  }
};

summa = function(arr) {
  var i, item, len, res;
  res = 0;
  for (i = 0, len = arr.length; i < len; i++) {
    item = arr[i];
    res += item;
  }
  return res;
};

expected_score = function(ratings, own_rating) {
  var rating;
  return summa((function() {
    var i, len, results;
    results = [];
    for (i = 0, len = ratings.length; i < len; i++) {
      rating = ratings[i];
      results.push(1 / (1 + 10 ** ((rating - own_rating) / 400)));
    }
    return results;
  })());
};

performance_rating = function(pp, ratings) {
  var hi, lo, rating;
  lo = 0;
  hi = 4000;
  while (Math.abs(hi - lo) > 0.001) {
    rating = (lo + hi) / 2;
    if (pp > expected_score(ratings, rating)) {
      lo = rating;
    } else {
      hi = rating;
    }
  }
  return rating;
};


// Använd två extremvärden då man har 0% eller 100%
extrapolate = function(a0, b0, elos) {
  var a, b;
  a = performance_rating(a0, elos);
  b = performance_rating(b0, elos);
  return b + b - a;
};

performance = function(pp, elos) {
  var n;
  n = elos.length;
  if (n === 1) {
    if (pp === 0) {
      return extrapolate(0.50, 0.25, elos);
    }
    if (pp === n) {
      return extrapolate(0.50, 0.75, elos);
    }
  } else {
    if (pp === 0) {
      return extrapolate(1, 0.5, elos);
    }
    if (pp === n) {
      return extrapolate(n - 1, n - 0.5, elos);
    }
  }
  return performance_rating(pp, elos);
};

calculate = function() {
  var data, elos, input, item, pp;
  input = document.getElementById("INPUT").value;
  input = input.replaceAll(',', ' ');
  data = input.trim().split(' ');
  if (data.length <= 1) {
    return;
  }
  pp = parseFloat(data.pop());
  elos = (function() {
    var i, len, results;
    results = [];
    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];
      results.push(parseFloat(item));
    }
    return results;
  })();
  return document.getElementById("PR").innerText = performance(pp, elos).toFixed(6);
};

calculate();

ass("1118", performance(0.0, [1500]).toFixed(0));

ass("1500", performance(0.5, [1500]).toFixed(0));

ass("1882", performance(1.0, [1500]).toFixed(0));

ass("1161", performance(0.0, [1500, 1600]).toFixed(0));

ass("1356", performance(0.5, [1500, 1600]).toFixed(0));

ass("1550", performance(1.0, [1500, 1600]).toFixed(0));

ass("1744", performance(1.5, [1500, 1600]).toFixed(0));

ass("1939", performance(2.0, [1500, 1600]).toFixed(0));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi5cXC4uXFwiLCJzb3VyY2VzIjpbImNvbnRlbnRcXGtsdWJiZW5cXG1lZGxlbW1hclxcY2hyaXN0ZXItbmlsc3NvblxcUGVyZm9ybWFuY2VfQ2FsY3VsYXRvclxcaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsa0JBQUEsRUFBQTs7QUFBQSxHQUFBLEdBQU0sUUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILENBQUE7RUFDTCxJQUFHLENBQUEsS0FBSyxDQUFSO0lBQ0MsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWjtJQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBWjtXQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBWixFQUhEOztBQURLOztBQU1OLEtBQUEsR0FBUSxRQUFBLENBQUMsR0FBRCxDQUFBO0FBQ1IsTUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtFQUFDLEdBQUEsR0FBTTtFQUNOLEtBQUEscUNBQUE7O0lBQ0MsR0FBQSxJQUFPO0VBRFI7U0FFQTtBQUpPOztBQU1SLGNBQUEsR0FBaUIsUUFBQSxDQUFDLE9BQUQsRUFBVSxVQUFWLENBQUE7QUFBd0IsTUFBQTtTQUFDLEtBQUE7O0FBQU87SUFBQSxLQUFBLHlDQUFBOzttQkFBQSxDQUFBLEdBQUksQ0FBQyxDQUFBLEdBQUksRUFBQSxJQUFJLENBQUMsQ0FBQyxNQUFBLEdBQVMsVUFBVixDQUFBLEdBQXdCLEdBQXpCLENBQVQ7SUFBSixDQUFBOztNQUFQO0FBQXpCOztBQUVqQixrQkFBQSxHQUFxQixRQUFBLENBQUMsRUFBRCxFQUFLLE9BQUwsQ0FBQTtBQUNyQixNQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7RUFBQyxFQUFBLEdBQUs7RUFDTCxFQUFBLEdBQUs7QUFDTCxTQUFNLElBQUksQ0FB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QVksR0FBWixFQUFnQixDQUFDLElBQUQsRUFBTSxJQUFOLENBQWhCLENBQTRCLENBQUMsT0FBN0IsQ0FBcUMsQ0FBckMsQ0FBWjs7QUFDQSxHQUFBLENBQUksTUFBSixFQUFZLFdBQUEsQ0FBWSxHQUFaLEVBQWdCLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBaEIsQ0FBNEIsQ0FBQyxPQUE3QixDQUFxQyxDQUFyQyxDQUFaOztBQUNBLEdBQUEsQ0FBSSxNQUFKLEVBQVksV0FBQSxDQUFZLEdBQVosRUFBZ0IsQ0FBQyxJQUFELEVBQU0sSUFBTixDQUFoQixDQUE0QixDQUFDLE9BQTdCLENBQXFDLENBQXJDLENBQVo7O0FBQ0EsR0FBQSxDQUFJLE1BQUosRUFBWSxXQUFBLENBQVksR0FBWixFQUFnQixDQUFDLElBQUQsRUFBTSxJQUFOLENBQWhCLENBQTRCLENBQUMsT0FBN0IsQ0FBcUMsQ0FBckMsQ0FBWjs7QUFDQSxHQUFBLENBQUksTUFBSixFQUFZLFdBQUEsQ0FBWSxHQUFaLEVBQWdCLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBaEIsQ0FBNEIsQ0FBQyxPQUE3QixDQUFxQyxDQUFyQyxDQUFaIiwic291cmNlc0NvbnRlbnQiOlsiYXNzID0gKGEsYikgLT5cclxuXHRpZiBhICE9IGIgXHJcblx0XHRjb25zb2xlLmxvZyAnYXNzZXJ0IGZhaWx1cmUnXHJcblx0XHRjb25zb2xlLmxvZyBhXHJcblx0XHRjb25zb2xlLmxvZyBiXHJcblxyXG5zdW1tYSA9IChhcnIpIC0+XHJcblx0cmVzID0gMFxyXG5cdGZvciBpdGVtIGluIGFyclxyXG5cdFx0cmVzICs9IGl0ZW1cclxuXHRyZXNcclxuXHJcbmV4cGVjdGVkX3Njb3JlID0gKHJhdGluZ3MsIG93bl9yYXRpbmcpIC0+IHN1bW1hICgxIC8gKDEgKyAxMCoqKChyYXRpbmcgLSBvd25fcmF0aW5nKSAvIDQwMCkpIGZvciByYXRpbmcgaW4gcmF0aW5ncylcclxuXHJcbnBlcmZvcm1hbmNlX3JhdGluZyA9IChwcCwgcmF0aW5ncykgLT5cclxuXHRsbyA9IDBcclxuXHRoaSA9IDQwMDBcclxuXHR3aGlsZSBNYXRoLmFicyhoaSAtIGxvKSA+IDAuMDAxXHJcblx0XHRyYXRpbmcgPSAobG8gKyBoaSkgLyAyXHJcblx0XHRpZiBwcCA+IGV4cGVjdGVkX3Njb3JlIHJhdGluZ3MsIHJhdGluZ1xyXG5cdFx0XHRsbyA9IHJhdGluZ1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRoaSA9IHJhdGluZ1xyXG5cdHJhdGluZ1xyXG4gXHJcbiMgQW52w6RuZCB0dsOlIGV4dHJlbXbDpHJkZW4gZMOlIG1hbiBoYXIgMCUgZWxsZXIgMTAwJVxyXG5leHRyYXBvbGF0ZSA9IChhMCwgYjAsIGVsb3MpIC0+XHJcblx0YSA9IHBlcmZvcm1hbmNlX3JhdGluZyBhMCxlbG9zXHJcblx0YiA9IHBlcmZvcm1hbmNlX3JhdGluZyBiMCxlbG9zXHJcblx0YiArIGIgLSBhXHJcblxyXG5wZXJmb3JtYW5jZSA9IChwcCxlbG9zKSAtPiBcclxuXHRuID0gZWxvcy5sZW5ndGhcclxuXHRpZiBuID09IDFcclxuXHRcdGlmIHBwID09IDAgdGhlbiByZXR1cm4gZXh0cmFwb2xhdGUgMC41MCwwLjI1LGVsb3NcclxuXHRcdGlmIHBwID09IG4gdGhlbiByZXR1cm4gZXh0cmFwb2xhdGUgMC41MCwwLjc1LGVsb3NcclxuXHRlbHNlXHJcblx0XHRpZiBwcCA9PSAwIHRoZW4gcmV0dXJuIGV4dHJhcG9sYXRlICAgMSwgIDAuNSxlbG9zXHJcblx0XHRpZiBwcCA9PSBuIHRoZW4gcmV0dXJuIGV4dHJhcG9sYXRlIG4tMSxuLTAuNSxlbG9zXHJcblx0cGVyZm9ybWFuY2VfcmF0aW5nIHBwLGVsb3NcclxuXHJcbmNhbGN1bGF0ZSA9IC0+XHJcblx0aW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIklOUFVUXCIpLnZhbHVlXHJcblx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlQWxsICcsJywnICdcclxuXHRkYXRhID0gaW5wdXQudHJpbSgpLnNwbGl0ICcgJ1xyXG5cdGlmIGRhdGEubGVuZ3RoIDw9IDEgdGhlbiByZXR1cm5cclxuXHRwcCA9IHBhcnNlRmxvYXQgZGF0YS5wb3AoKVxyXG5cdGVsb3MgPSAocGFyc2VGbG9hdCBpdGVtIGZvciBpdGVtIGluIGRhdGEpXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQUlwiKS5pbm5lclRleHQgPSBwZXJmb3JtYW5jZShwcCwgZWxvcykudG9GaXhlZCA2XHJcblxyXG5jYWxjdWxhdGUoKVxyXG5cclxuYXNzIFwiMTExOFwiLCBwZXJmb3JtYW5jZSgwLjAsWzE1MDBdKS50b0ZpeGVkIDBcclxuYXNzIFwiMTUwMFwiLCBwZXJmb3JtYW5jZSgwLjUsWzE1MDBdKS50b0ZpeGVkIDBcclxuYXNzIFwiMTg4MlwiLCBwZXJmb3JtYW5jZSgxLjAsWzE1MDBdKS50b0ZpeGVkIDBcclxuXHJcbmFzcyBcIjExNjFcIiwgcGVyZm9ybWFuY2UoMC4wLFsxNTAwLDE2MDBdKS50b0ZpeGVkIDBcclxuYXNzIFwiMTM1NlwiLCBwZXJmb3JtYW5jZSgwLjUsWzE1MDAsMTYwMF0pLnRvRml4ZWQgMFxyXG5hc3MgXCIxNTUwXCIsIHBlcmZvcm1hbmNlKDEuMCxbMTUwMCwxNjAwXSkudG9GaXhlZCAwXHJcbmFzcyBcIjE3NDRcIiwgcGVyZm9ybWFuY2UoMS41LFsxNTAwLDE2MDBdKS50b0ZpeGVkIDBcclxuYXNzIFwiMTkzOVwiLCBwZXJmb3JtYW5jZSgyLjAsWzE1MDAsMTYwMF0pLnRvRml4ZWQgMFxyXG4iXX0=
//# sourceURL=c:\github\SrS\content\klubben\medlemmar\christer-nilsson\Performance_Calculator\index.coffee