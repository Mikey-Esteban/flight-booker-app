class AddDestinationReferenceToFlights < ActiveRecord::Migration[6.0]
  def change
    add_reference :flights, :destination, foreign_key: { to_table: :airports }, null: false    
  end
end
