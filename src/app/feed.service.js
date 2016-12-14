export const FeedService = function ($http, $timeout, $rootScope, $log, $q) {
  'ngInject';
  const login = 'kthompson';
  const token = 'd05e2c134ca1ee5ec8729de7eaaf8869';
  const options = {
    'hub.mode': 'retrieve',
    'hub.callback': 'https://push.superfeedr.com/dev/null',
    'count': 10000,
    'format': 'json',
    'wait': 'stream',
    'authorization': btoa([login, token].join(':'))
  };
  let started = false;
  const dfd = $q.defer();

  const svc = {
    beginStrem,
    data: {
      items: [],
      opening: [],
      closing: []
    }
  };

  return svc;
  // =====================

  function beginStrem() {
    if (!started) {
      started = true;
      const source = new EventSource(_buildUrl(options, 'https://stream.superfeedr.com/?'));

      source.onerror = error => {
        $rootScope.$apply(() => {
          dfd.reject(error);
          $log.error(error);
        });
      };

      source.addEventListener("notification", e => {
        $rootScope.$apply(() => {
          dfd.resolve();
          const items = angular.fromJson(e.data).items.map(item => {
            item.date = new Date(item.updated * 1000);
            _buildTags(item);
            return item;
          });
          _buildLists(items);
          if (svc.data.items.length && items.length) {
            for (let i = 0; i < items.length; i++) {
              _spawnNotification(items[i].title);
            }
          }
          svc.data.items = items.concat(svc.data.items);
        });
      });
    }

    return dfd.promise;
  }

  function _buildLists(items = []) {
    _buildClosingList(items);
    _buildOpeningList(items);
  }

  function _buildClosingList(items) {
    const newItems = _buildGenericList(items, /(closed|closing|Closures|shutter)/i, /(closed|closing|Closures|shutter)/i);
    svc.data.closing = newItems.concat(svc.data.closing);
  }

  function _buildOpeningList(items) {
    const newItems = _buildGenericList(items, /(Most Anticipated|opening soon|coming attractions)/i, /(most-anticipated|opening)/i);
    svc.data.opening = newItems.concat(svc.data.opening);
  }

  function _buildGenericList(items, titleRegex, urlRegex) {
    return items.filter(item => item.title.match(titleRegex) || item.permalinkUrl.match(urlRegex));
  }

  function _buildTags(item) {
    item.tags = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(item.content, 'text/html');
    const nodes = doc.body.childNodes;
    if (doc.body.firstElementChild) {
      item.image = doc.body.firstElementChild.getAttribute('src');
    }
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] && nodes[i].nodeName === 'H2' || nodes[i].nodeName === 'H3') {
        const subParser = new DOMParser();
        const sub = subParser.parseFromString(nodes[i].innerHTML, 'text/html');
        const subNodes = sub.body.childNodes;
        if (subNodes.length > 1 || !subNodes[0]) {
          break;
        }
        const tag = subNodes[0].textContent ? subNodes[0].textContent : nodes[i].innerHTML;
        item.tags.push(tag);
      }
    }
  }

  function _buildUrl(query, _url) {
    let url = 'https://push.superfeedr.com/?';
    if (angular.isDefined(_url)) {
      url = _url;
    }
    for (const k in query) {
      if (query.hasOwnProperty(k)) {
        url += `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}&`;
      }
    }
    return url;
  }

  function _spawnNotification(title, options) {
    Notification.requestPermission().then(result => {
      if (result === "granted") {
        const notification = new Notification(title, options);
        $log.log(notification);
        // $timeout(notification.close.bind(notification), 5000);
      }
    });
  }
};
