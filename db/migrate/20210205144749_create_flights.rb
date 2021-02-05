class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.datetime :start
      t.string :duration

      t.timestamps
    end
  end
end
