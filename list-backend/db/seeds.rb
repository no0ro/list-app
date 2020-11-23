# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# List.delete_all
# Item.delete_all
# Then rake db:seed

# > l3 = List.create(title: "Grocery List")
# #<List id: 6, title: "Grocery List", created_at: "2020-11-19 15:29:01", updated_at: "2020-11-19 15:29:01"> 
l1 = List.create(title: "React Project Ideas")
l2 = List.create(title: "Faith's Wedding: Maid of Honor Duties")
l3 = List.create(title: "Grocery List")
l4 = List.create(title: "Faith's Wedding: Bachelorette Party Planning")
l5 = List.create(title: "Movies To Watch")


# > i1 = Item.create(name: "pizza", list_id: l3.id)
# => Item(id: integer, name: string, list_id: integer, created_at: datetime, updated_at: datetime) 
# i1 = Item.create(name: "Pizza", list_id: l3.id)   # => #<Item id: 1, name: "pizza", list_id: 6, created_at: "2020-11-19 15:30:52", updated_at: "2020-11-19 15:30:52"> 
l1.items.create(name: "Make an app where users can up or down vote songs on a playlist")
l1.items.create(name: "App where you can input packaged food ingredients and it will show food allergies ")

l2.items.create(name: "Plan Bachelorette")
l2.items.create(name: "Speech")

l3.items.create(name: "Pizza")
l3.items.create(name: "Banana")
l3.items.create(name: "Ice cream")
l3.items.create(name: "Kombucha")
l3.items.create(name: "Avocado")

l4.items.create(name: " Confirm Invitees")
l4.items.create(name: " Decide Location, Time")
l4.items.create(name: " Send out Invites")

l5.items.create(name: "Titanic")


# > @test = List.last
#  => #<List id: 41, title: "Movies To Watch", created_at: "2020-11-21 18:18:38", updated_at: "2020-11-21 18:18:38"> 
# > @test.items
#  => #<ActiveRecord::Associations::CollectionProxy [#<Item id: 69, name: "Titanic", list_id: 41, created_at: "2020-11-21 18:18:38", updated_at: "2020-11-21 18:18:38">]> 
# > @harry = Item.create(name: "Harry Met Sally")
#  => #<Item id: nil, name: "Harry Met Sally", list_id: nil, created_at: nil, updated_at: nil> 
# > @new = @test.items.push(@harry)
#  => #<ActiveRecord::Associations::CollectionProxy [#<Item id: 70, name: "Harry Met Sally", list_id: 41, created_at: "2020-11-21 18:25:18", updated_at: "2020-11-21 18:25:18">, #<Item id: 69, name: "Titanic", list_id: 41, created_at: "2020-11-21 18:18:38", updated_at: "2020-11-21 18:18:38">]> 
# > @new
#  => #<ActiveRecord::Associations::CollectionProxy [#<Item id: 70, name: "Harry Met Sally", list_id: 41, created_at: "2020-11-21 18:25:18", updated_at: "2020-11-21 18:25:18">, #<Item id: 69, name: "Titanic", list_id: 41, created_at: "2020-11-21 18:18:38", updated_at: "2020-11-21 18:18:38">]> 
#  > @test
#  => #<List id: 41, title: "Movies To Watch", created_at: "2020-11-21 18:18:38", updated_at: "2020-11-21 18:18:38"> 
#  > @test.items
#  => #<ActiveRecord::Associations::CollectionProxy [#<Item id: 70, name: "Harry Met Sally", list_id: 41, created_at: "2020-11-21 18:25:18", updated_at: "2020-11-21 18:25:18">, #<Item id: 69, name: "Titanic", list_id: 41, created_at: "2020-11-21 18:18:38", updated_at: "2020-11-21 18:18:38">]> 



# ----------------------------
# > List.first
# => #<List id: 17, title: "React Project Ideas", created_at: "2020-11-19 16:11:13", updated_at: "2020-11-19 16:11:13"> 
# > List.first.items
# => #<ActiveRecord::Associations::CollectionProxy [#<Item id: 33, name: "Make an app where users can up or down vote songs ...", list_id: 17, created_at: "2020-11-19 16:11:13", updated_at: "2020-11-19 16:11:13">, #<Item id: 34, name: "App where you can input packaged food ingredients ...", list_id: 17, created_at: "2020-11-19 16:11:13", updated_at: "2020-11-19 16:11:13">]> 

# ADD ITEM TO A LIST
# grocery.items[1]
# => #<Item id: 38, name: "Banana", list_id: 19, created_at: "2020-11-19 16:11:13", updated_at: "2020-11-19 16:11:13"> 
# > grocery.items[1].name
#  => "Banana"
# -------------------------------


# iGroupPlaylist = Item.create(name: "Make an app where users can up or down vote songs on a playlist", list_id: l1.id) 
# iAllergy = Item.create(name: "App where you can input packaged food ingredients and it will show food allergies ", list_id: l1.id) 

# iBachelorette = Item.create(name: "Plan Bachelorette", list_id: l2.id) 
# iSpeech = Item.create(name: "Write reception speech", list_id: l2.id) 

# iInvites = Item.create(name: "Confirm Invitees", list_id: l4.id) 
# iPlanCity = Item.create(name: "Decide Location, Time", list_id: l4.id) 
# iInvites = Item.create(name: "Send out Invites", list_id: l4.id) 


# iTitanic = Item.create(name: "Titanic", list_id: l5.id)


# iIceCream = Item.create(name: "Ice cream", list_id: l3.id)   
# iBanana = Item.create(name: "Banana", list_id: l3.id)   
# iKombucha = Item.create(name: "Kombucha", list_id: l3.id)  
# iAvocado = Item.create(name: "Avocado", list_id: l3.id) 

# l3.items
#<ActiveRecord::Associations::CollectionProxy [#<Item id: 1, name: "pizza", list_id: 6, created_at: "2020-11-19 15:30:52", updated_at: "2020-11-19 15:30:52">, #<Item id: 2, name: "ice cream", list_id: 6, created_at: "2020-11-19 15:33:08", updated_at: "2020-11-19 15:33:08">]> 



# l3.items.map(item  => item.name)
#  List.create(title: "Gratitude List") / albums to listen to/ quotes