const router = require('express').Router();
const useragent = require('useragent');

// header parser
router.get('/', (req, res) => {
  const ipaddress = req.ip;
  const language = req.acceptsLanguages()[0];
  const agent = useragent.parse(req.headers['user-agent']);
  const software = `${agent.os.family}_${agent.os.major}_${agent.os.minor}_${
    agent.os.patch
  }`;

  res.json({ ipaddress, language, software });
});

module.exports = router;
