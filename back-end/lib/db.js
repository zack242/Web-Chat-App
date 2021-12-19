
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel,email) => {
      if(!channel.name) throw Error('Invalid channel')
      if(!email) throw Error('Invalid user')

      try
      {
        await db.put(`users:${email}`, JSON.stringify({email : email}))
      }catch(err)
      {
        console.log(err);
      }

      const id = uuid()
      channel.admin = email
      await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      return merge(channel, {id: id})
    },
    list: async (email) => {
      return new Promise( (resolve, reject) => {

        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {

          channel = JSON.parse(value)
          channel.id = key.split(':')[1]


          if(channel.admin===email)
          {
            channels.push(channel)

          }else if(channel.members)
          {
            if(channel.members.includes(email))
            {
              channels.push(channel)
            }
          }

        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    update: (id, channel) => {
      if(!id) throw Error('Invalid channel')
      if(!channel) throw Error('Data error')

      db.put(`channels:${id}`, JSON.stringify(channel))

      return merge(channel, {id: id})
    },
    delete: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },
  messages: {
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid message')
      if(!message.content) throw Error('Invalid message')
      creation = microtime.now()

      let date_ob = new Date();

      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      today = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;


      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        authorid : message.authorid,
        content: message.content,
        date : today
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    update: (message) => {
       const id = message.content.channelId
       const creation = message.content.creation

        db.put(`messages:${id}:${creation}`,
         JSON.stringify({
         author: message.content.author,
         authorid : message.content.authorid,
         content: message.content.content,
         date : message.content.date,
       }))
    },
    delete: (channelId,creation) => {
      db.del(`messages:${channelId}:${creation}`)

    }
  },
  users: {
    create: async (user) => {
      if(!user.username) throw Error('Invalid user')
      const id = uuid()
      await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`users:${id}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: (id, user) => {
      db.put(`users:${id}`, JSON.stringify(user))
      return merge(user)
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
