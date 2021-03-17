const oAuth2 = {
    /**
     * Initialize
     */
    init() {
        this.KEY = 'gitleet_token';
        this.ACCESS_TOKEN_URL =
            'https://github.com/login/oauth/access_token';
        this.AUTHORIZATION_URL =
            'https://github.com/login/oauth/authorize';
        this.CLIENT_ID = 'cb931bb24734c8429525';
        this.CLIENT_SECRET  = 'eb25b843143f852fdab9345ad737a52bb8f38a05'
        this.REDIRECT_URL = 'https://github.com/';
        this.SCOPES = ['repo'];
    },

    /**
     * Begin
     */
    begin() {
        this.init(); // secure token params.

        let url = `${this.AUTHORIZATION_URL}?client_id=${this.CLIENT_ID}&redirect_uri${this.REDIRECT_URL}&scope=`;

        for (let i = 0; i < this.SCOPES.length; i += 1) {
            url += this.SCOPES[i];
        }

        chrome.storage.local.set({ pipe_gitleet: true }, () => {
            // opening pipe temporarily

            chrome.tabs.create({ url, selected: true }, function() {
                window.close();
                chrome.tabs.getCurrent(function(tab) {
                    chrome.tabs.remove(tab.id, function() {});
                });
            });
        });
    },
};