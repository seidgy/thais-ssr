

const type = "website";
const url = "https://novo.thaisimobiliaria.com.br/";
const title = "Thaís Imobiliária";
const description = "Thaís Imobiliária imovéis para venda e locação";
const picture = "https://managing-images.kenlo.io/unsafe/600x400/filters:quality(100)/storage.googleapis.com/kenlo-sites-images/VWRCUkQ2Tnp3d1BJRDBJVe1s0xgxSbBGOsBT9+RO1zjks-ynciLnlXpdKzsuCVZKPvMZhGt-GI0v+QFtypVh7xY3icsFUfjv4HHembm5wv7fiGO536-3h5Ts7uLDcYCHkIkx36P+GAOhv-Q1TYF+Yx0oNrkjGhayU4mMNSFcqnywpkzMApYcDjsIkihq3TwLiXGSRtX2r1N9gXmfBv-V53TUCe28WXh7OsFfAttJ8h8PpwKpSRFyvwoXqw==.png";
const site_name = "Thaís Imobiliária";
export default (meta) => {
  return [
    {
        hid:"og:title",
       name:"og:title",
       content:(meta && meta.title) || title
    },
    {
        hid:"og:description",
       name:"og:description",
       content:(meta && meta.description) || description
    },
    {
        hid:"og:site_name",
       name:"og:site_name",
       content:(meta && meta.site_name) || site_name
    },
    {
        hid:"og:url",
       name:"og:url",
       content:(meta && meta.url) || url
    },
    {
        hid:"og:type",
       name:"og:type",
       content:(meta && meta.type) || type
    },
    {
        hid:"og:image",
       name:"og:image",
       content:(meta && meta.picture) || picture
    }
 ]
};
